#pragma once

#include "Troop.h"
#include <iostream>

class Archer : public Troop{
    private:
        const int range;
    
    public:
        Archer()
            : Troop("Archer", 100, 40),
                range(5)
        {}

        void attack() override{
            std::cout   
                << name
                << " shoots an arrow from "
                << range
                << " units away causing "
                << damage
                << " damage!\n";
        }

        void move() override{
            std::cout
                << name
                << " moves stealthly into shooting position. \n";
        }
};