#pragma once

#include "PaymentStrategy.h"
#include <string>
#include <iostream>

class GooglePayPayment : public PaymentStrategy{
    private:
        std::string pin;
    
    public:
        GooglePayPayment(
            const std::string& pin
        )
            :pin(pin)

        {}

        void pay(double amount) override{
            std::cout   
                << "Processing $"
                << amount
                << " payment through GooglePay.\n";
        }

};