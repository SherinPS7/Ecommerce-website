# import os
# import pandas as pd

# # Directory containing all CSV files
# DATA_DIR = "./data"

# # Read all CSV files and merge them
# def merge_csv_files():
#     all_files = [os.path.join(DATA_DIR, f) for f in os.listdir(DATA_DIR) if f.endswith('.csv')]
#     dataframes = [pd.read_csv(f) for f in all_files]
    
#     # Combine all CSV files into one DataFrame
#     merged_df = pd.concat(dataframes, ignore_index=True)
    
#     # Save the merged dataset
#     merged_df.to_csv("merged_products.csv", index=False)
#     print("Merged dataset saved as merged_products.csv")

# if __name__ == "__main__":
#     merge_csv_files()
# import os
# import pandas as pd

# DATA_DIR = "./data"  # Path to CSV files

# def merge_csv_files():
#     all_files = [os.path.join(DATA_DIR, f) for f in os.listdir(DATA_DIR) if f.endswith('.csv')]
#     dataframes = []

#     for file in all_files:
#         try:
#             df = pd.read_csv(file, encoding="utf-8", engine="python", on_bad_lines="skip")  # Handle errors
#             df.dropna(how="all", inplace=True)  # Remove empty rows
#             df = df.map(lambda x: x.strip() if isinstance(x, str) else x)  # Use map() instead of applymap()
#             dataframes.append(df)
#         except Exception as e:
#             print(f"Skipping {file} due to error: {e}")

#     # Merge all CSV data
#     merged_df = pd.concat(dataframes, ignore_index=True)

#     # Save the cleaned merged CSV
#     merged_df.to_csv("merged_products.csv", index=False, encoding="utf-8", lineterminator="\n")

#     print("Merged dataset saved as merged_products.csv (Cleaned and fixed!)")

# if __name__ == "__main__":
#     merge_csv_files()

from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
import pandas as pd

# Load the merged product dataset
def load_product_data():
    df = pd.read_csv("merged_products.csv")
    return df

# Initialize the chatbot
bot = ChatBot(
    "ShoppingBot",
    storage_adapter="chatterbot.storage.SQLStorageAdapter",
database_uri="sqlite:///models/chatbot.sqlite3",
    logic_adapters=[
        "chatterbot.logic.BestMatch"
    ]
)

trainer = ListTrainer(bot)

# Train chatbot on product data and small talk
def train_chatbot():
    df = load_product_data()
    conversations = []

    ## 🔹 **Conversational Greetings & Small Talk**
    conversations.extend([
        "Hi", "Hello! What can I help you with today?",
        "Hello", "Hi there! Looking for anything specific?",
        "Hey", "Hey! I'm here to assist you with shopping.",
        "How are you?", "I'm just a chatbot, but I'm happy to help!",
        "What's your name?", "I'm ShoppingBot, your personal shopping assistant!",
        "Tell me a joke", "Why did the laptop go to the doctor? Because it had a virus! 😆",
        "Thank you", "You're welcome! Let me know if you need anything else.",
        "Goodbye", "Goodbye! Have a great day and happy shopping!"
    ])

    ## 🔹 **Product-Related Conversations**
    for _, row in df.iterrows():
        product_info = f"{row['name']} in {row['sub_category']} under {row['main_category']} category, priced at {row['discount_price']} (original price: {row['actual_price']}). Rated {row['ratings']} stars from {row['no_of_ratings']} reviews."

        conversations.append(row["name"])
        conversations.append(product_info)

        conversations.append(f"What is the price of {row['name']}?")
        conversations.append(f"The price of {row['name']} is {row['discount_price']}. (Original: {row['actual_price']})")
        
        conversations.append(f"Tell me about {row['name']}")
        conversations.append(product_info)

    ## 🔹 **Category-Based Offers**
    categories = df["main_category"].unique()
    
    for category in categories:
        category_df = df[df["main_category"] == category]
        discount_offers = category_df[["name", "discount_price", "actual_price"]].to_dict(orient="records")
        
        discount_response = f"Here are some discounted products in {category}: " + ", ".join(
            [f"{item['name']} at {item['discount_price']} (Original: {item['actual_price']})" for item in discount_offers[:5]]
        )

        conversations.append(f"What are the best deals in {category}?")
        conversations.append(discount_response)

        conversations.append(f"Show me discounts on {category} items")
        conversations.append(discount_response)

    ## 🔹 **Handling Unknown Queries**
    conversations.append("What is ChatGPT?")
    conversations.append("Sorry, I can only answer product-related queries.")

    conversations.append("Can you help me with something else?")
    conversations.append("I'm here to assist with shopping-related queries. Ask me about products, prices, or discounts!")

    # Train the bot
    trainer.train(conversations)
    print("Chatbot training complete!")

if __name__ == "__main__":
    train_chatbot()
