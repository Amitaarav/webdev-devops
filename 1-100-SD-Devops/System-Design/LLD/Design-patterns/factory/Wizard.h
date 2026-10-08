#pragma once

#include "Troop.h"
#include <iostream>

class Wizard : public Troop {
public:
    Wizard()
        : Troop("Wizard", 120, 70)
    {}

    void attack() override {
        std::cout
            << name
            << " casts a fireball causing "
            << damage
            << " magical damage!\n";
    }

    void move() override {
        std::cout
            << name
            << " teleports short distances!\n";
    }
};