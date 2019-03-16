#include "stdio.h"

int sum_of_args(int a, int b){
	return a + b;
}

void main(){
	int some_sum = sum_of_args(5, 3);
	printf("Result: %d", some_sum);
}