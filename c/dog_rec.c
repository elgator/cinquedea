#include "stdio.h"

int print_dog(void){
	printf("у попа была собака, он её любил\n");
	printf("она съела кусок мяса, он её убил\n");
	printf("в землю закопал\n");
	printf("и надпись написал, что ");
	
	print_dog();
}

int main(void){
	
	print_dog();
	
	return 0;
	
}