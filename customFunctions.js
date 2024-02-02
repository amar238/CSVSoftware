//******* Required custom fucntions for the project *******//

// function to sort array of objects of batches based on year and month
module.exports.sortBatches = (a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    }
    const monthsOrder = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthsOrder.indexOf(a.month) - monthsOrder.indexOf(b.month);
};