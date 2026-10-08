#pragma once

#include "PaymentStrategy.h"
#include <string>
#include <iostream>

class CreditCardPayment: public PaymentStrategy{
    private:
        std::string name;
        std::string cardNumber;
        std::string cvv;
        std::string expiryDate;

    public:
        CreditCardPayment(
            const std::string& name,
            const std::string& cardNumber,
            const std::string& cvv,
            const std::string& expiryDate
        )
            :name(name),
            cardNumber(cardNumber),
            cvv(cvv),
            expiryDate(expiryDate)

        {}

        void pay(double amount) override{
            std::cout
                << "Processing $"
                << amount
                << " payment with Credit Card belonging to "
                << name
                << ".\n";
        }
};