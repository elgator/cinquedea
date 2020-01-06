#include "stdio.h"
#include "stdlib.h"

/* void qsort ( void * first, size_t number, size_t size, int ( * comparator ) ( const void *, const void * ) ) */

int reverse_sorter(const void *first_arg, const void *second_arg) {
	int* first = (int*) first_arg;
	int* second = (int*) second_arg;

	printf("comparator call %d %d\n", *first, *second);

	/* здесь ваш код сравнения, возвращающий -1, 0 или 1 */
	if (*first < *second){
		return 1;
	} else if (*first == *second){
		return 0;
	} else {
		return -1;
	}
}

int reverse_sorter_float(const void *first_arg, const void *second_arg) {
	float* first = (float*) first_arg;
	float* second = (float*) second_arg;

	printf("comparator call %d %d\n", *first, *second);

	/* здесь ваш код сравнения, возвращающий -1, 0 или 1 */
	if (*first < *second){
		return 1;
	} else if (*first == *second){
		return 0;
	} else {
		return -1;
	}
}

void sort_hlp(char * first, char *tmp_arr, size_t number, size_t size, int ( * comparator ) ( const void *, const void * ) ){
	
	int half;
	printf("len %d | first ", number);
	for (int i=0; i<size; i++){
		printf("%d", first[i]);
	}
	printf(" | ");
	if (number == 1){
		printf("up | ");
		return;
	} else {
		half = number / 2;
		printf("half %d | ", half);
		
		sort_hlp(first, tmp_arr, half, size, comparator);
		sort_hlp(&first[half * size], tmp_arr, number - half, size, comparator);
		
		/* merge */
		int lt = 0; 
		int rt = half;
		int tmp = 0;
		int tmp_idx = 0;
		int cmp = 0;
		while ((lt < half) && (rt < number)) {
			cmp = comparator(&first[lt * size], &first[rt * size]);
			if (cmp == 1){
				for (int i=0; i<size; i++){
					tmp_arr[tmp_idx * size + i] = first[rt * size + i];
				}
				rt++;
			} else {
				for (int i=0; i<size; i++){
					tmp_arr[tmp_idx * size + i] = first[lt * size + i];
				}
				lt++;
			};
			tmp_idx++;
		};
		if (lt == half){
			while (rt < number){
				for (int i=0; i<size; i++){
					tmp_arr[tmp_idx * size + i] = first[rt * size + i];
				}
				rt++;
				tmp_idx++;
			}
		} else {
			while (lt < half){
				for (int i=0; i<size; i++){
					tmp_arr[tmp_idx * size + i] = first[lt * size + i];
				}
				lt++;
				tmp_idx++;
			}
		};
		if (tmp_idx != number) {printf("err %d", tmp_idx);};
		
		printf("merge ");
		for (int i=0; i<number * size; i++){
			first[i] = tmp_arr[i];
			printf("%d ", first[i]);
		};
		printf("| ");
	};
};

void merge_sort(void * first, size_t number, size_t size, int ( * comparator ) ( const void *, const void * ) ){
	char* f = (char*) first;
	
	char tmp_arr[number * size]; /* to keep interim merge results */
	
	printf("first  - first value of the sequence being sorted\n");
	printf("len    - length of the sequence being sorted\n");
	printf("half   - length of appx half of sequence(left)\n");
	printf("merge  - merged sorted sequence\n");
	printf("\n");
	sort_hlp(f, tmp_arr, number, size, comparator);
	
};

int main(void){
	int array[10] = {3, 5, 1, 7, 2, 7, 6, 0, 8, 4};
	int array1[10] = {3, 5, 1, 7, 2, 7, 6, 0, 8, 4};
	printf("====QSORT=====\n");
	qsort(array, 10, sizeof(int), reverse_sorter);
	printf("\n");
	
	for(int i=0; i<=9; i++){
		printf("%d ", array[i]);
	};
	
	printf("\n\n\n=====MERGE INT=====\n\n");

	merge_sort(array1, 10, sizeof(int), reverse_sorter);
	
	
	printf("\n");
	for(int i=0; i<=9; i++){
		printf("%d ", array1[i]);
	}
	
	printf("\n\n\n=====MERGE FLOAT=====\n\n");
	
	float array2[10] = {3.0, 5.2, 1.6, 7.4, 2.6, 7.8, 6.5, 0.1, 8.0, 4.7};
	
	merge_sort(array2, 10, sizeof(float), reverse_sorter_float);

	printf("\n");
	for(int i=0; i<=9; i++){
		printf("%0.1f ", array2[i]);
	}

	
	printf("\n");
	
	return 0;
	
}