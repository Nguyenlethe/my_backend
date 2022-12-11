import db from "../models/index";
import _ from "lodash";

function createNewDiscounts(newdayStart, newDayEnd, oldDayStart, oldDayEnd) {
  let result = {};

  // Thời gian bắt đầu discount cũ
  var YearDiscountItemsStart = new Date(oldDayStart).getFullYear();
  var MonthDiscountItemsStart = new Date(oldDayStart).getMonth() + 1;
  var DateDiscountItemsStart = new Date(oldDayStart).getDate();
  var HoursDiscountItemsStart = new Date(oldDayStart).getHours();
  var MinutesDiscountItemsStart = new Date(oldDayStart).getMinutes();

  // Thời gian kết thúc discount cũ
  var YearDiscountItems = new Date(oldDayEnd).getFullYear();
  var MonthDiscountItems = new Date(oldDayEnd).getMonth() + 1;
  var DateDiscountItems = new Date(oldDayEnd).getDate();
  var HoursDiscountItems = new Date(oldDayEnd).getHours();
  var MinutesDiscountItems = new Date(oldDayEnd).getMinutes();

  //___________________________________________________________________________

  // Thời gian bắt đầu discount mới
  var YearPresent = new Date(newdayStart).getFullYear();
  var MonthPresent = new Date(newdayStart).getMonth() + 1;
  var DatePresent = new Date(newdayStart).getDate();
  var HoursPresent = new Date(newdayStart).getHours();
  var MinutesPresent = new Date(newdayStart).getMinutes();

  // Thời gian kết thúc discount mới
  var YearPresentEnd = new Date(newDayEnd).getFullYear();
  var MonthPresentEnd = new Date(newDayEnd).getMonth() + 1;
  var DatePresentEnd = new Date(newDayEnd).getDate();
  var HoursPresentEnd = new Date(newDayEnd).getHours();
  var MinutesPresentEnd = new Date(newDayEnd).getMinutes();

  if (
    (YearPresent && YearPresentEnd < YearDiscountItemsStart) ||
    (YearPresent && YearPresentEnd > YearDiscountItems)
  ) {
    result = true;
  } else {
    if (
      (MonthPresent && MonthPresentEnd > MonthDiscountItems) ||
      (MonthPresent && MonthPresentEnd < MonthDiscountItemsStart)
    ) {
      result = true;
    } else {
      if (
        (DatePresent && DatePresentEnd > DateDiscountItems) ||
        (DatePresent && DatePresentEnd < DateDiscountItemsStart)
      ) {
        result = true;
      } else {
        if (
          (HoursPresentEnd && HoursPresent > HoursDiscountItems) ||
          (HoursPresentEnd && HoursPresent < HoursDiscountItemsStart)
        ) {
          result = true;
        } else {
          result = {
            valueEn: `Add Failed, the discount period has not ended. End (${HoursDiscountItems}) !!!`,
            valueVi: `Thêm Không thành công, thời gian giảm giá chưa kết thúc. Kết thúc (${HoursDiscountItems}) !!!`,
          };
        }
      }
    }
  }
  return result;
}

const getDiscount = async (data, type) => {
  let getDisCountItems = {};

  if (type === "ITEMSID") {
    // Get items discount
    getDisCountItems = await db.Items_discount.findOne({
      where: {
        idShop: data.idShop,
        forItemCategory: data.forItemCategory,
        forItemType: data.forItemType,
        itemsId: data.itemsId,
      },
      include: [
        { model: db.Discount, attributes: ["valueEn"] },
        { model: db.Voucher, attributes: ["limitVn", "limitUs"] },
        {
          model: db.Items,
          attributes: [
            "idItems",
            "name",
            "nameEn",
            "price",
            "priceUS",
            "newPrice",
            "newPriceUS",
          ],
          include: [
            {
              model: db.Items_color_image,
              as: "dataImgItems",
              attributes: ["image"],
            },
          ],
          group: ["idItems"],
          raw: true,
          nest: true,
        },
      ],
      raw: true,
      nest: true,
    });
  }

  if (type === "TYPE") {
    // Get items discount
    getDisCountItems = await db.Items_discount.findOne({
      where: {
        idShop: data.idShop,
        forItemCategory: data.forItemCategory,
        forItemType: data.forItemType,
        itemsId: "EMPTY",
      },
      include: [
        { model: db.Discount, attributes: ["valueEn"] },
        { model: db.Voucher, attributes: ["limitVn", "limitUs"] },
        { model: db.Type, attributes: ["valueEn", "valueVi"] },
      ],
      raw: true,
      nest: true,
    });
  }

  if (type === "CATEGORY") {
    // Get items discount
    getDisCountItems = await db.Items_discount.findOne({
      where: {
        idShop: data.idShop,
        forItemCategory: data.forItemCategory,
        forItemType: "EMPTY",
        itemsId: "EMPTY",
      },
      include: [
        { model: db.Discount, attributes: ["valueEn"] },
        { model: db.Voucher, attributes: ["limitVn", "limitUs"] },
        { model: db.Category, attributes: ["valueEn", "valueVi"] },
      ],
      raw: true,
      nest: true,
    });
  }

  // Nếu items tồn tại
  if (getDisCountItems) {
    if (type !== "ITEMSID") {
      getDisCountItems.Item = type;
    }

    let dataDiscountStartEn = `${new Date(
      getDisCountItems.dayStart
    ).getHours()}:${
      new Date(getDisCountItems.dayStart).getMinutes() + "" === "0"
        ? new Date(getDisCountItems.dayStart).getMinutes() + "0"
        : new Date(getDisCountItems.dayStart).getMinutes()
    }   Day ${new Date(getDisCountItems.dayStart).getDate()}/${
      new Date(getDisCountItems.dayStart).getMonth() + 1
    }/${new Date(getDisCountItems.dayStart).getFullYear()}`;
    let dataDiscountEndEn = `${new Date(getDisCountItems.dayEnd).getHours()}:${
      new Date(getDisCountItems.dayEnd).getMinutes() + "" === "0"
        ? new Date(getDisCountItems.dayEnd).getMinutes() + "0"
        : new Date(getDisCountItems.dayEnd).getMinutes()
    }   Day ${new Date(getDisCountItems.dayEnd).getDate()}/${
      new Date(getDisCountItems.dayEnd).getMonth() + 1
    }/${new Date(getDisCountItems.dayEnd).getFullYear()}`;
    let dataDiscountStartVi = `${new Date(
      getDisCountItems.dayStart
    ).getHours()}:${
      new Date(getDisCountItems.dayStart).getMinutes() + "" === "0"
        ? new Date(getDisCountItems.dayStart).getMinutes() + "0"
        : new Date(getDisCountItems.dayStart).getMinutes()
    }  Ngày ${new Date(getDisCountItems.dayStart).getDate()}/${
      new Date(getDisCountItems.dayStart).getMonth() + 1
    }/${new Date(getDisCountItems.dayStart).getFullYear()}`;
    let dataDiscountEndVi = `${new Date(getDisCountItems.dayEnd).getHours()}:${
      new Date(getDisCountItems.dayEnd).getMinutes() + "" === "0"
        ? new Date(getDisCountItems.dayEnd).getMinutes() + "0"
        : new Date(getDisCountItems.dayEnd).getMinutes()
    }   Ngày ${new Date(getDisCountItems.dayEnd).getDate()}/${
      new Date(getDisCountItems.dayEnd).getMonth() + 1
    }/${new Date(getDisCountItems.dayEnd).getFullYear()}`;

    // Báo lỗi khi items đã đc add discount
    return {
      isEXIST: true,
      dataItems: getDisCountItems.Item,
      name: getDisCountItems.Category || getDisCountItems.Type,
      discount: getDisCountItems.Discount.valueEn,
      limitPrice: getDisCountItems.Voucher,
      valueEn: `Apply from (${dataDiscountStartEn}) - To (${dataDiscountEndEn})`,
      valueVi: `Áp dụng từ (${dataDiscountStartVi}) - Đến (${dataDiscountEndVi})`,
    };
  } else {
    return { isEXIST: false };
  }
};

export default {
  createNewDiscounts,
  getDiscount,
};
