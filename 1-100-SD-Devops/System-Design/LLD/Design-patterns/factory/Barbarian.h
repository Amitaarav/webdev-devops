#pragma once

#include "Troop.h"
#include <iostream>

class Barbarian : public Troop{
    public:
        Barbarian()
            : Troop("Barbarian", 150, 50)
        {}

        void attack() override {
            std::cout
                << name
                << " swing sword causing "
                << damage
                << " damage!\n";
        }

        void move() override{
            std::cout
                << name
                << " charges quickly towards the enemy!\n";
        }
};