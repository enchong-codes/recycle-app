const recyclingData = {
  day: {
    bottlesSaved: 0, // Start at 0 bottles saved (dynamic)
    carbonReduced: 0, // CO2 reduced for "day" range (dynamic)
  },
  week: {
    bottlesSaved: 28, // Static value
    carbonReduced: 3.976, // Static value in kg
  },
  month: {
    bottlesSaved: 120, // Static value
    carbonReduced: 17.04, // Static value in kg
  },
  year: {
    bottlesSaved: 1450, // Static value
    carbonReduced: 205.4, // Static value in kg
  },
  allTime: {
    bottlesSaved: 4320, // Static value
    carbonReduced: 612.48, // Static value in kg
  },
};

export default recyclingData;
