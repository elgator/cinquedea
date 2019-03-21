#include "stdio.h"

float bmi(float mass, float height){
	
	return mass / (height * height);
}


int main(void){
	
	float mass, height;
	float bmi_calc;
	
	printf("\n");
	printf("Введите массу в килограммах: ");
	scanf("%f", &mass);
	printf("Введите высоту в сантиметрах: ");
	scanf("%f", &height);
	if (height == 0){
		printf("\nERR: Высота должна быть ненулевой\n\n");
		return 0;
	}
	
	bmi_calc = bmi(mass, height / 100);
	
	printf("--------------------------------------\n");
	printf("\n");
	printf("Ваш BMI %0.2f кг/м2 : ", bmi_calc);
	printf("\n");
	
	if (bmi_calc <= 16){
		printf("Выраженный дефицит массы тела\n");
	} else if (bmi_calc <= 18.5){
		printf("Недостаточная масса тела\n");
	} else if (bmi_calc <= 24.99){
		printf("Норма\n");
	} else if (bmi_calc <= 30) {
		printf("Избыточная масса тела\n");
	} else if (bmi_calc <= 35) {
		printf("Ожирение\n");
	} else if (bmi_calc <= 40) {
		printf("Резкое ожирение");
	} else {
		printf("Очень резкое ожирение");
	};
	
	return 0;
}