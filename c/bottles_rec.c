#include "stdio.h"

int print_bottles(int bottles_on_wall){
	char *ending;
	ending = "s";
	
	if (bottles_on_wall == 1){
		printf("1 bottle of beer on the wall, 1 bottle of beer.\n", bottles_on_wall);
		printf("Take one down, pass it around, no more bottles of beer on the wall...\n");
		printf("No more bottles of beer on the wall, no more bottles of beer.\n");
		printf("We've taken them down and passed them around; now we're drunk and passed out!\n");
		return 0;
		
	}else {
		if (bottles_on_wall == 2){
			ending = "";
		}
		printf("%d bottles of beer on the wall, %d bottles of beer.\n", bottles_on_wall, bottles_on_wall);
		printf("Take one down, pass it around, %d bottle%s of beer on the wall...\n", bottles_on_wall - 1, ending);
		print_bottles(bottles_on_wall - 1);
	};
}

int main(void){
	
	print_bottles(99);
	
	return 0;
}