

function createNewDiscounts(newdayStart,newDayEnd, oldDayStart,oldDayEnd){

    let result = {}

        // Thời gian bắt đầu discount cũ
        var YearDiscountItemsStart =  new Date(oldDayStart).getFullYear()
        var MonthDiscountItemsStart =  new Date(oldDayStart).getMonth() + 1
        var DateDiscountItemsStart =  new Date(oldDayStart).getDate()
        var HoursDiscountItemsStart =  new Date(oldDayStart).getHours()
        var MinutesDiscountItemsStart =  new Date(oldDayStart).getMinutes()

        // Thời gian kết thúc discount cũ
        var YearDiscountItems =  new Date(oldDayEnd).getFullYear()
        var MonthDiscountItems =  new Date(oldDayEnd).getMonth() + 1
        var DateDiscountItems =  new Date(oldDayEnd).getDate()
        var HoursDiscountItems =  new Date(oldDayEnd).getHours()
        var MinutesDiscountItems =  new Date(oldDayEnd).getMinutes()

        //___________________________________________________________________________

        // Thời gian bắt đầu discount mới
        var YearPresent =  new Date(newdayStart).getFullYear()
        var MonthPresent =  new Date(newdayStart).getMonth() + 1
        var DatePresent =  new Date(newdayStart).getDate()
        var HoursPresent =  new Date(newdayStart).getHours()
        var MinutesPresent =  new Date(newdayStart).getMinutes()
        
        // Thời gian kết thúc discount mới
        var YearPresentEnd =  new Date(newDayEnd).getFullYear()
        var MonthPresentEnd =  new Date(newDayEnd).getMonth() + 1
        var DatePresentEnd =  new Date(newDayEnd).getDate()
        var HoursPresentEnd =  new Date(newDayEnd).getHours()
        var MinutesPresentEnd =  new Date(newDayEnd).getMinutes()

    
        if(YearPresent && YearPresentEnd < YearDiscountItemsStart || YearPresent && YearPresentEnd > YearDiscountItems ){
            result = true
        }else{
            if(MonthPresent && MonthPresentEnd > MonthDiscountItems || MonthPresent && MonthPresentEnd < MonthDiscountItemsStart ){
                result = true
            }else{
                if(DatePresent && DatePresentEnd > DateDiscountItems || DatePresent && DatePresentEnd < DateDiscountItemsStart){
                    result = true
                }else{
                    if(HoursPresentEnd && HoursPresent > HoursDiscountItems || HoursPresentEnd && HoursPresent < HoursDiscountItemsStart){
                        result = true
                    }else{
                        result = {
                            valueEn: `Add Failed, the discount period has not ended. End (${HoursDiscountItems}) !!!`,
                            valueVi: `Thêm Không thành công, thời gian giảm giá chưa kết thúc. Kết thúc (${HoursDiscountItems}) !!!`
                        }
                    }
                }
            }
        }
    return result
}


function demo(){
    return false
}





export default {
    createNewDiscounts,
    demo
}