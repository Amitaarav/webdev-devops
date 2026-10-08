#include <iostream>
#include <string>

#include "TroopFactoryBetter.h"

int main() {

    std::cout
        << "Enter troop type "
        << "(Barbarian, Archer, Wizard, HogRider):\n";

    std::string type;
    std::getline(std::cin, type);

    std::unique_ptr<Troop> troop =
        TroopFactoryBetter::createTroop(type);

    troop->move();
    troop->attack();

    return 0;
}