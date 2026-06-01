#include <stdio.h>
#include <time.h>

int main() {
    time_t now = time(NULL);

    printf("Hello ASL!\n");
    printf("Current date: %s", ctime(&now));

    return 0;
}