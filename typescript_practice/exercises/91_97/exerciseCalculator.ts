// setting up structure of object of return values to be returned
interface Result {
    periodLength: number,
    trainingDays: number,
    target: number,
    average: number,
    success: boolean,
    rating: number,
    ratingDescription: string
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

console.log(calcExercise([3, 0, 2, 4.5, 0, 3, 1], 2))