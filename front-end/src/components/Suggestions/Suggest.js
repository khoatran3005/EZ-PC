import React from 'react';


const Suggest = () => {
  if (studentLevel === "Elementary") {
    if (
      processorType === "Intel any" ||
      processorType === "AMD any" ||
      (memorySize >= 8 && memorySize <= 16) ||
      (storageSize >= 256 && storageSize <= 512) ||
      (displaySize >= 13 && displaySize <= 15) ||
      displayQuality === "FHD" ||
      graphics === "Integrated"
    ) {
      return "Recommend computer suitable for an elementary student based on specifications";
    }
  } else if (studentLevel === "Middle School") {
    if (
      (processorType === "Intel 3" || processorType === "AMD Ryzen") ||
      (memorySize >= 8 && memorySize <= 16) ||
      (storageSize >= 512 && storageSize <= 1024) ||
      (displaySize >= 14 && displaySize <= 15) ||
      displayQuality === "FHD" ||
      graphics === "Integrated"
    ) {
      return "Recommend computer suitable for a middle school student based on specifications";
    }
  } else if (studentLevel === "High School") {
    if (
      (processorType === "Intel 5" || processorType === "AMD Ryzen") ||
      memorySize >= 16 ||
      (storageSize >= 512 && storageSize <= 1024) ||
      (displaySize >= 15 && displaySize <= 16) ||
      displayQuality === "FHD" ||
      graphics === "Integrated"
    ) {
      return "Recommend computer suitable for a high school student based on specifications";
    }
  } else if (studentLevel === "College") {
    if (
      (processorType === "Intel 7" || processorType === "Intel 9" || processorType === "AMD Ryzen") ||
      memorySize >= 16 ||
      storageSize >= 512 ||
      (displaySize >= 15 && displaySize <= 16) ||
      displayQuality === "FHD" ||
      graphics === "Integrated"
    ) {
      return "Recommend computer suitable for a college student based on specifications";
    }
  } else if (hobby === "Gaming") {
    if (
      (processorType === "Intel 7" || processorType === "Intel 9" || processorType === "AMD Ryzen") ||
      memorySize >= 16 ||
      storageSize >= 512 ||
      (displaySize >= 15 && displaySize <= 17) ||
      displayQuality === "FHD" ||
      (graphics === "Dedicated" && dedicatedGraphicsMemory >= 4)
    ) {
      return "Recommend computer suitable for gaming enthusiasts based on specifications";
    }
  } else if (hobby === "Video Editing") {
    if (
      (processorType === "Intel 7" || processorType === "Intel 9" || processorType === "AMD Ryzen") ||
      memorySize >= 16 ||
      storageSize >= 512 ||
      (displaySize >= 15 && displaySize <= 17) ||
      (displayQuality === "2K" || displayQuality === "4K") ||
      (graphics === "Dedicated" && dedicatedGraphicsMemory >= 4)
    ) {
      return "Recommend computer suitable for video editing enthusiasts based on specifications";
    }
  }

  return "No specific recommendation based on provided information";
};


export default Suggest;

