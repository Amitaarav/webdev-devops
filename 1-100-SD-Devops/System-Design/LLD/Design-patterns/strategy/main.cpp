#include <iostream>
#include <memory>

#include "PaymentProcessor.h"
#include "PayPalPayment.h"
#include "GooglePayPayment.h"
#include "CreditCardPayment.h"

int main() {

    double amount;

    std::cout << "Enter payment amount: $";
    std::cin >> amount;

    std::cout << "\nSelect payment method:\n";
    std::cout << "1. PayPal\n";
    std::cout << "2. GPay\n";
    std::cout << "3. Credit Card\n";

    std::cout << "Your choice: ";

    int choice;
    std::cin >> choice;

    std::unique_ptr<PaymentStrategy> strategy;

    switch (choice) {

        case 1: {
            std::string email;

            std::cout << "Enter your PayPal email: ";
            std::cin >> email;

            strategy =
                std::make_unique<PayPalPayment>(email);

            break;
        }

        case 2: {
            std::string pin;

            std::cout << "Enter your PIN: ";
            std::cin >> pin;

            strategy =
                std::make_unique<GooglePayPayment>(pin);

            break;
        }

        case 3: {
            std::string name;
            std::string card;
            std::string cvv;
            std::string expiry;

            std::cout << "Enter your name: ";
            std::cin >> name;

            std::cout << "Enter your card number: ";
            std::cin >> card;

            std::cout << "Enter your CVV: ";
            std::cin >> cvv;

            std::cout << "Enter your expiry date: ";
            std::cin >> expiry;

            strategy =
                std::make_unique<CreditCardPayment>(
                    name,
                    card,
                    cvv,
                    expiry
                );

            break;
        }

        default:
            std::cout << "Invalid choice.\n";
            return 1;
    }

    PaymentProcessor processor(strategy.get());

    processor.processPayment(amount);

    return 0;
}