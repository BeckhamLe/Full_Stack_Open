interface bmiValues {
    height: number;
    weight: number;
}

const parseArgumentsBmi = (args: string[]): bmiValues => {
    if(args.length > 4) throw new Error("Too many arguments");
    if(args.length < 4) throw new Error("Too few arguments");

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error("The numbers provided are not numbers");
    }
}

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
    const bmi = (weight / (height * height)) * 10000;
    
    return bmiCategory(bmi)
}

try {
    const { height, weight } = parseArgumentsBmi(process.argv);    // parse values in terminal and set them to height and weight
    console.log(calculateBmi(height, weight))    // calculate bmi
} catch(err) {                                              // if there was error during parsing:
    let errorMessage = "Something bad happened. "       // create default error msg
    if(err instanceof Error){                       // check if err is of the Error constructor class
        errorMessage += `Error: ${err.message}`     // if so attach more info to error msg
    }
    console.log(errorMessage)               // print error message to console
}