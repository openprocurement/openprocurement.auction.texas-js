const parseCurrentStage = (stages, currentStage, context) =>{
  // logic for setting context.state, context.endTimerDatte and another based on getted data from Api
  if (currentStage === -100) {
    context.state = 'canceled'
    return
  }
  else if (currentStage === -101) {
    context.state = 'redefined'
    return
  }
  else if (currentStage === -1) {
    context.state = 'pendingOfAuction';
    context.endTimerDate = Math.trunc(Date.parse(stages[0].start) / 1000);
  }
  else{
    if (stages[currentStage].type === 'english') {
      context.state = 'active';
      context.endTimerDate = Math.trunc(Date.parse(stages[currentStage].planned_end) / 1000);
    }
    else if (stages[currentStage].type === 'pause') {
      context.state = 'pendingOfRound';
      context.endTimerDate = Math.trunc(Date.parse(stages[currentStage + 1].start) / 1000)
    }
    else if (stages[currentStage].type === 'announcement') {
      context.state = 'completed';
    }
    else if (stages[currentStage].type === 'pre-announcement') {
      context.state = 'preAnnouncement';
      context.hongTrigger = true;
    }
  }

  if (currentStage !== -1) {
    context.currentBid = stages[currentStage].amount;
  }

  if (currentStage === 0) {
    if (stages[currentStage].type !== 'pause') {
      context.state = 'active';
      context.endTimerDate = Math.trunc(Date.parse(stages[currentStage].planned_end) / 1000);
    }
    else if (stages[currentStage].type === 'pause') {
      context.state = 'pendingOfRound';
      context.endTimerDate = Math.trunc(Date.parse(stages[currentStage + 1].start) / 1000)
    }
  }
}
export default parseCurrentStage