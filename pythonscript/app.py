from pymongo import MongoClient
from bson.objectid import ObjectId  # Import ObjectId to handle object ids
import openai
# Set up your OpenAI API key
openai.api_key = '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'
# Connection parameters
MONGO_CONNECTION_STRING = "mongodb+srv://sza5988:8ikrhYX69iZtKC3c@cluster0.gy8yo5o.mongodb.net/"
DB_NAME = "CCPoints"
EARN_RATES_COLLECTION = "earnRates"
POINT_VALUES_COLLECTION = "rewardValues"
def categorize(website_description):
    allowed_categories = set([
        "airfare", "other travel", "dining", "medical", 
        "utilities", "grocery", "warehouse club", "retail"
    ])
    attempts = 0
    max_attempts = 5  # Limit the number of retries to prevent an infinite loop
    category = None

    while attempts < max_attempts:
        # Increment the attempt count
        attempts += 1
        # Make a request to the OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant."
                },
                {
                    "role": "user",
                    "content": f"Categorize the following website based on the short description on the title of the weblink into one of the following categories: airfare, other travel, dining, medical, utilities, grocery, warehouse club, retail. \n\n{website_description}. Output only the same words that are the category name. Nothing else. all responses must be lowercase"
                }
            ]
        )
        # Assume the category is the first word of the response
        category = response['choices'][0]['message']['content'].strip().lower()

        # If the response is one of the allowed categories, break out of the loop
        if category in allowed_categories:
            break

        print(f"Attempt {attempts}: Unexpected category {category}, retrying...")

    # If the loop exits without finding a valid category, log a warning
    if category not in allowed_categories:
        print(f"Warning: Unable to categorize website after {max_attempts} attempts")

    return category

def get_best_card(type, card_ids):
    client = MongoClient(MONGO_CONNECTION_STRING)
    db = client[DB_NAME]
    
    # Convert string ids to ObjectId instances
    card_object_ids = [ObjectId(card_id) for card_id in card_ids]
    
    # Fetch the specified cards and their earn rates
    earn_rates = db[EARN_RATES_COLLECTION].find({"_id": {"$in": card_object_ids}})
    
    # Keep track of the best card and its effective earn rate
    best_card = None
    best_effective_earn_rate = 0
    
    for card in earn_rates:
        # Fetch the value of the points for this card
        point_value = db[POINT_VALUES_COLLECTION].find_one({
            "_id": card["TypeOfPoints"]
        })["value_cents_oct2023"]
    
        # Calculate the effective earn rate for the type of purchase
        effective_earn_rate = card["EarnRate"][type] * point_value
        
        # Update the best card if this card has a higher effective earn rate
        if effective_earn_rate > best_effective_earn_rate:
            best_card = card["CardName"]
            best_effective_earn_rate = effective_earn_rate
    
    client.close()
    print(f"The best card for a {type} purchase is: {best_card} with a {best_effective_earn_rate}% reward on the purchase.")
    return best_card, best_effective_earn_rate

# Example call with a list of card Object IDs
card_ids = ['653460dc322d54dd152847f1', '653460dc322d54dd152847f2', '653460dc322d54dd152847f3', '653460dc322d54dd15284803']
website_description = "Explore the world with Booking.com. Big savings on homes, hotels, flights, car rentals, taxis and attractions – build your perfect trip on any budget."
cat = categorize(website_description)
print(cat)
ans = get_best_card(cat, card_ids)
print(ans)