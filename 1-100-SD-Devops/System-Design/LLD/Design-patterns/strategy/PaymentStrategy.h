#pragma once

class PaymentStrategy{
    public:
        virtual ~PaymentStrategy() = default;

        virtual void pay(double amount) = 0; // every payment stratedy must provide its own implementation of pay()
};