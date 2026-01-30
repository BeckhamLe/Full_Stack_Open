const bmiCategory = (bmi: number): string => {
    switch(true){
        case bmi < 18.5:
            return "Underweight";
        case bmi >= 18.5 && bmi <= 24.9:
            return "Normal Range"
        case bmi >= 25 && bmi <= 29.9:
            return "Overweight"
        case bmi >= 30:
            return "Obese" 
    }
}

const calculateBmi = (height: number, weight: number): string => {
    const bmi = (weight / (height * height)) * 10000
    
    return bmiCategory(bmi)
}

console.log(calculateBmi(180, 85))