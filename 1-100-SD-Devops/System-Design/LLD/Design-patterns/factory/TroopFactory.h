#pragma once

#include <string>
#include <stdexcept>
#include <algorithm>
#include <cctype>

#include "Troop.h"
#include "Barbarian.h"
#include "Archer.h"
#include "Wizard.h"
#include "HogRider.h"

class TroopFactory {
public:
    static Troop* createTroop(const std::string& type) {

        if (equalsIgnoreCase(type, "Barbarian")) {
            return new Barbarian();
        }

        if (equalsIgnoreCase(type, "Archer")) {
            return new Archer();
        }

        if (equalsIgnoreCase(type, "Wizard")) {
            return new Wizard();
        }

        if (equalsIgnoreCase(type, "HogRider")) {
            return new HogRider();
        }

        throw std::invalid_argument(
            "Unknown troop type: " + type
        );
    }

private:
    static bool equalsIgnoreCase(
        const std::string& a,
        const std::string& b
    ) {
        if (a.size() != b.size()) {
            return false;
        }

        for (size_t i = 0; i < a.size(); ++i) {
            if (std::tolower(
                    static_cast<unsigned char>(a[i])
                )
                !=
                std::tolower(
                    static_cast<unsigned char>(b[i])
                )) {
                return false;
            }
        }

        return true;
    }
};