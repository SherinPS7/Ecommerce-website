"use client"; // Marking this as a client-side component
import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const ChatContext = createContext();

// Custom hook to access chat state
export const useChat = () => {
  return useContext(ChatContext);
};

// The provider component for wrapping the app
export const ChatProvider = ({ children }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [cart, setCart] = useState([]);

  // Function to load state from localStorage
  const loadStateFromLocalStorage = () => {
    const savedChatOpen = localStorage.getItem("chatOpen");
    const savedCart = localStorage.getItem("cart");

    if (savedChatOpen !== null) {
      setChatOpen(JSON.parse(savedChatOpen)); // Convert string back to boolean
    }
    if (savedCart !== null) {
      setCart(JSON.parse(savedCart)); // Convert string back to array
    }
  };

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("chatOpen", JSON.stringify(chatOpen));
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [chatOpen, cart]);

  // Load the state when the component mounts
  useEffect(() => {
    loadStateFromLocalStorage();
  }, []);

  return (
    <ChatContext.Provider value={{ chatOpen, setChatOpen, cart, setCart }}>
      {children}
    </ChatContext.Provider>
  );
};
