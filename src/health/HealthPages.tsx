import StepsCard from '../health/cards/StepsCard'
import HeartRateCard from '../health/cards/HeartRateCard'
import SleepCard from '../health/cards/SleepCard'
import RespiratoryRateCard from '../health/cards/RespiratoryCard'
import DistanceWalkingRunningCard from '../health/cards/DistanceWalkingRunningCard'
import ActiveEnergyBurnedCard from '../health/cards/ActiveEnergyBurnedCard'

function HealthPages() {
  return (
    <div className="d-flex gap-2 w-100 p-2" >
      <div className="d-flex flex-column gap-2 flex-fill">
        <StepsCard/>
        <HeartRateCard/>
        <ActiveEnergyBurnedCard/>
      </div>
      <div className="d-flex flex-column gap-2 flex-fill">
        <SleepCard/>
        <RespiratoryRateCard/>
        <DistanceWalkingRunningCard/>
      </div>
      
    </div>
  )
}

export default HealthPages;