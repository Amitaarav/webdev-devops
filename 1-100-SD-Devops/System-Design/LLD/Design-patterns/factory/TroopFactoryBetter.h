#pragma once

#include <memory>
#include <string>
#include <stdexcept>

#include "Troop.h"
#include "Barbarian.h"
#include "Archer.h"
#include "Wizard.h"
#include "HogRider.h"

class TroopFactoryBetter {
public:
    static std::unique_ptr<Troop>
    /**
     * Troop* troop = new Archer(); , we need to delete troop; to avoid leak memory
     *  with std::unique_ptr<Troop> troop = std::make_unique<Archar>(); cpp automatically destroys the object when troop goes out of scope.
     * 
     * :: Resource Acquisition Is Initialization
     */
    createTroop(const std::string& type) {

        if (type == "Barbarian") {
            return std::make_unique<Barbarian>();
        }

        if (type == "Archer") {
            return std::make_unique<Archer>();
        }

        if (type == "Wizard") {
            return std::make_unique<Wizard>();
        }

        if (type == "HogRider") {
            return std::make_unique<HogRider>();
        }

        throw std::invalid_argument(
            "Unknown troop type: " + type
        );
    }
};