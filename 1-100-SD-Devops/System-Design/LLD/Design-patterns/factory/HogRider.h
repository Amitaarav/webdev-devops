#pragma once

#include "Troop.h"
#include <iostream>

class HogRider : public Troop {
public:
    HogRider()
        : Troop("Hog Rider", 200, 60)
    {}

    void attack() override {
        std::cout
            << name
            << " smashes defenses causing "
            << damage
            << " damage!\n";
    }

    void move() override {
        std::cout
            << name
            << " moves fast and jumps over walls!\n";
    }
};