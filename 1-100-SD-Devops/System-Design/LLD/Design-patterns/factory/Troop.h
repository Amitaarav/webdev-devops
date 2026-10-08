#pragma once

#include <string>

class Troop{
    protected:
        std::string name;
        int health;
        int damage;

    public:
        Troop(
            const std::string& name,
            int health,
            int damage
        )   
            : name(name),
            health(health),
            damage(damage)
        {}

        virtual ~Troop() = default;

        virtual void attack() = 0; // Troop declares the interface, but doesn't implement. Derived classes must implement it. // =0 pure virtual function, abstract class
        virtual void move() = 0;

        const std::string& getName() const {
            return name;
        }

        int getHealth() const{
            return health;
        }

};