#include <iostream>
#include <ctime>

int main() {
    time_t now = time(0);
    char* dt = ctime(&now);
    std::cout << "Hello World, " << dt;
    return 0;
}