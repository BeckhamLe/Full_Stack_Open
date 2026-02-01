// setting up type structure for the command line argument values
interface exerciseArgs {
    schedule: number[];     // array of CLI values from index 2 till the 2nd to last index
    target: number;         //last value in CLI 
}

// setting up structure of labels of what value type goes to which one for the exercise calculator results
interface Result {
    periodLength: number,
    trainingDays: number,
    target: number,
    average: number,
    success: boolean,
    rating: number,
    ratingDescription: string
}

// Function to parse CLI values
const parseArgumentsExercise = (args: string[]): exerciseArgs => {
    let newSched: number[] = []     // new array for storing the weekly schedule hours from CLI
    
    // Loop through all values of weekly schedule hrs from CLI 
    for (let i=2; i < args.length-1; i++) {
        if(!isNaN(Number(args[i]))){                // if value at index is a number: 
            newSched = newSched.concat(Number(args[i]))     // then add that value to the array
        } else {
            throw new Error("One of the values provided isn't a number")    // if not a number --> throw error
        }
    }

    return {
        schedule: newSched,
        target: Number(args[args.length-1])
    }
}

// Calculating all exercise result values to be returned
const calcExercise = (schedule: number[], targetVal: number): Result => {
    const totalDays = schedule.length;  // period of length trained in
    const trainedDays = schedule.filter((hr) => hr > 0);    // array of days trained
    const totalTrainedHrs = schedule.reduce((accumulator, currentVal) => {
        return accumulator + currentVal;    // sum all hrs trained each day
    }, 0)
    const avgTrainedHrs = totalTrainedHrs / totalDays;  // avg daily exercise over period length
    let successVal = false; // flag if user met or exceeded target value of daily average training 
    let ratingVal = 0;  // rating of their performance
    let ratingMsg = ""; // message associated with their rating given

    // Check if user met or exceeded target
    if(avgTrainedHrs >= targetVal){
        successVal = true;
    }

    // Determine user's rating and rating message
    switch(true){
        case avgTrainedHrs < (targetVal*0.333):
            ratingVal = 1;
            ratingMsg = "bad, you need more exercise";
            break;
        case avgTrainedHrs >= (targetVal*0.333) && avgTrainedHrs < (targetVal*0.999):
            ratingVal = 2;
            ratingMsg = "decent, but could use more work";
            break;
        case avgTrainedHrs >= (targetVal*0.999):
            ratingVal = 3;
            ratingMsg = "excellent, you are on track! Good Job!";
            break;
    }

    // set the values of the return object and return the object
    return{
        periodLength: schedule.length,
        trainingDays: trainedDays.length,
        target: targetVal,
        average: avgTrainedHrs,
        success: successVal,
        rating: ratingVal,
        ratingDescription: ratingMsg
    }
}

try{
    const {schedule, target} = parseArgumentsExercise(process.argv)     // create an object to hold the array for schedule and the value for target that will be provided by the function ran here
    console.log(calcExercise(schedule, target))
} catch(err) {
    let errorMessage = "Something bad happened. "
    if(err instanceof Error){
        errorMessage += `Error: ${err.message}`
    }
    console.log(errorMessage)
}