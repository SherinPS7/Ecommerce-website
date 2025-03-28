# bot.py
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
import logging
import os

# Set up logging for ChatterBot
logging.basicConfig(level=logging.INFO)

# Initialize the chatbot
chatbot = ChatBot(
    "ShoppingBot",
    storage_adapter="chatterbot.storage.SQLStorageAdapter",
    database_uri="sqlite:///../models/chatbot.sqlite3",  # Adjust path if needed
    logic_adapters=[
        "chatterbot.logic.BestMatch",
        "chatterbot.logic.MathematicalEvaluation",
        "chatterbot.logic.BestMatch"
    ]
)

# Check if the model is loaded successfully
def check_chatbot():
    print("Chatbot initialized and ready to respond. Type 'exit' to end the conversation.")

# Function to handle user input and bot response
def chat_with_bot():
    print("Hi, I am your Shopping Assistant! How can I help you today?")
    
    while True:
        user_input = input("You: ")
        
        if user_input.lower() == 'exit':
            print("Goodbye!")
            break

        # Get response from the chatbot
        bot_response = chatbot.get_response(user_input)

        # If the bot's response is the same as the input, it means it couldn't find a match
        if bot_response == user_input:
            print("Bot: I'm sorry, I don't have a response for that. Can you ask something else?")
        else:
            print(f"Bot: {bot_response}")

if __name__ == "__main__":
    check_chatbot()
    chat_with_bot()
