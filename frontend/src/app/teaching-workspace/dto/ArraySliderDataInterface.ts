export interface ArraySliderDataInterface {
    // Loop variable name
    name: string,
    // Min index from which slider should start
    minIdx: number,
    // Max index upto which slider should end
    maxIdx: number,
    // Step by which variable is to be incremented
    stepBy: number
    // Min valid index value which slider can have
    validStepStartIdx: number,
    // Max valid index value which slider can have
    validStepEndIdx: number,
    // Determines whether the loop is incrementing / decrementing loop
    isLoopIncrementing: boolean
}