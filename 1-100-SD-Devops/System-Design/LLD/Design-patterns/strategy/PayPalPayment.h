#pragma once

#include "PaymentStrategy.h"
#include <string>
#include <iostream>

class PayPalPayment : public PaymentStrategy{
    private:
        std::string email;
    
    public:
        PayPalPayment(
            const std::string& email
        )
            :email(email)
        {}

        void pay(double amount ) override{
            std::cout
                << "Processing $"
                << amount
                << " payment through PayPal for "
                << email
                << ".\n";
        }
};