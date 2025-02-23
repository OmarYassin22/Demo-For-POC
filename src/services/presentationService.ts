import pptxgen from "pptxgenjs";

export const createPresentation = async (reportData: any) => {
  const pres = new pptxgen();

  // Title Slide
  const titleSlide = pres.addSlide();
  titleSlide.addText("تقرير الفحص والمعلومات", {
    x: 0.5,
    y: 0.5,
    w: "90%",
    fontSize: 24,
    rtl: true,
    align: "right",
    color: "363636",
  });

  // Summary Slide
  const summarySlide = pres.addSlide();
  summarySlide.addText("ملخص التقرير", {
    x: 0.5,
    y: 0.5,
    fontSize: 18,
    rtl: true,
    align: "right",
  });

  // Add statistics
  const stats = [
    { label: "إجمالي الاشتراطات", value: reportData.total },
    { label: "الاشتراطات المطابقة", value: reportData.matched },
    { label: "الاشتراطات غير المطابقة", value: reportData.unmatched },
  ];

  stats.forEach((stat, idx) => {
    summarySlide.addText(`${stat.label}: ${stat.value}`, {
      x: 0.5,
      y: 1 + (idx * 0.5),
      fontSize: 14,
      rtl: true,
      align: "right",
    });
  });

  // Results Slide
  const resultsSlide = pres.addSlide();
  resultsSlide.addText("نتائج الفحص", {
    x: 0.5,
    y: 0.5,
    fontSize: 18,
    rtl: true,
    align: "right",
  });

  // Save the presentation
  await pres.writeFile({ fileName: "تقرير-الفحص.pptx" });
};
