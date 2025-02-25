import React, { useEffect } from "react";
import styled from "styled-components";

// CSS-in-JS styles
const StyleWrapper = styled.div`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    color: #333;
  }

  section {
    padding: 20px;
    margin: 20px auto;
    background: white;
    border-radius: 8px;
    width: 100%;
    max-width: 1200px;
  }

  h2 {
    font-size: 1.8em;
    color: #007bff;
    margin-bottom: 10px;
    border-bottom: 2px solid #007bff;
    padding-bottom: 5px;
  }

  p {
    line-height: 1.6;
    margin: 10px 0;
  }

  .box {
    border-left: 4px #8080803d solid;
    border-top: 4px #8080803d solid;
    border-right: 4px #0a984586 solid;
    border-radius: 20px 0 0 0;
    padding: 1rem;
    position: relative;
    height: 17rem;
  }

  .box::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 8px 8px 0; /* Triangle size */
    border-color: transparent #0a984586 transparent transparent; /* Triangle color */
  }

  .row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 15px;
    margin: 20px 0;
  }

  .right-line {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 6px;
    background-color: #008000; /* Green color */
    border-top-right-radius: 15px;
  }

  .cond {
    flex: 1;
    min-width: 45%;
    text-align: center;
    padding: 10px;
  }

  .row img {
    max-width: 50%;
    height: auto;
    margin-top: 10px;
    margin-left: 10px;
  }

  .header {
    display: flex;
    gap: 20px;
    height: 70px;
    justify-content: start;
    margin-bottom: 0.5rem;
  }

  .header-title {
    color: #2f9a4f;
    text-align: right;
    margin: 0;
  }

  .header-body {
    font-size: 30px;
    font-weight: 800;
    margin-top: -0.5rem;
    color: gray;
  }

  .content {
    display: flex;
    align-items: center;
  }

  .content-body {
    text-align: right;
  }

  .content p {
    margin-left: 20px;
    font-size: 1rem;
    font-weight: 500;
  }

  .footer {
    max-width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background-color: #0a9845ba;
    border-radius: 0 0 25px 25px;
  }

  .check {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
    max-height: 10%;
    margin: 0 1rem;
  }

  .check p {
    font-size: 18px !important;
    font-weight: bold;
    color: #070707af;
  }

  .checkbox-wrapper-19 {
    box-sizing: border-box;
    --checkbox-height: 25px;
  }

  span {
    color: #539f74;
  }

  @-moz-keyframes dothabottomcheck-19 {
    0% {
      height: 0;
    }
    100% {
      height: calc(var(--checkbox-height) / 2);
    }
  }

  @-webkit-keyframes dothabottomcheck-19 {
    0% {
      height: 0;
    }
    100% {
      height: calc(var(--checkbox-height) / 2);
    }
  }

  @keyframes dothabottomcheck-19 {
    0% {
      height: 0;
    }
    100% {
      height: calc(var(--checkbox-height) / 2);
    }
  }

  @keyframes dothatopcheck-19 {
    0% {
      height: 0;
    }
    50% {
      height: 0;
    }
    100% {
      height: calc(var(--checkbox-height) * 1.2);
    }
  }

  @-webkit-keyframes dothatopcheck-19 {
    0% {
      height: 0;
    }
    50% {
      height: 0;
    }
    100% {
      height: calc(var(--checkbox-height) * 1.2);
    }
  }

  @-moz-keyframes dothatopcheck-19 {
    0% {
      height: 0;
    }
    50% {
      height: 0;
    }
    100% {
      height: calc(var(--checkbox-height) * 1.2);
    }
  }

  .checkbox-wrapper-19 input[type="checkbox"] {
    display: none;
  }

  .checkbox-wrapper-19 .check-box {
    height: var(--checkbox-height);
    width: var(--checkbox-height);
    background-color: white;
    border: calc(var(--checkbox-height) * 0.01) solid #000;
    border-radius: 5px;
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    transition: border-color ease 0.2s;
    cursor: pointer;
  }

  .checkbox-wrapper-19 .check-box::before,
  .checkbox-wrapper-19 .check-box::after {
    box-sizing: border-box;
    position: absolute;
    height: 0;
    width: calc(var(--checkbox-height) * 0.2);
    background-color: #34b93d;
    display: inline-block;
    transform-origin: left top;
    border-radius: 5px;
    content: " ";
    transition: opacity ease 0.5;
  }

  .checkbox-wrapper-19 .check-box::before {
    top: calc(var(--checkbox-height) * 0.72);
    left: calc(var(--checkbox-height) * 0.41);
    box-shadow: 0 0 0 calc(var(--checkbox-height) * 0.05)
      var(--background-color);
    transform: rotate(-135deg);
  }

  .checkbox-wrapper-19 .check-box::after {
    top: calc(var(--checkbox-height) * 0.37);
    left: calc(var(--checkbox-height) * 0.05);
    transform: rotate(-45deg);
  }

  .checkbox-wrapper-19 input[type="checkbox"]:checked + .check-box,
  .checkbox-wrapper-19 .check-box.checked {
    border-color: #34b93d;
  }

  .checkbox-wrapper-19 input[type="checkbox"]:checked + .check-box::after,
  .checkbox-wrapper-19 .check-box.checked::after {
    height: calc(var(--checkbox-height) / 2);
    animation: dothabottomcheck-19 0.2s ease 0s forwards;
  }

  .checkbox-wrapper-19 input[type="checkbox"]:checked + .check-box::before,
  .checkbox-wrapper-19 .check-box.checked::before {
    height: calc(var(--checkbox-height) * 1.2);
    animation: dothatopcheck-19 0.4s ease 0s forwards;
  }

  /* Improved structure and print styles */
  .page-section {
    break-inside: avoid;
    page-break-inside: avoid;
    margin-bottom: 2rem;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1.5rem;
    break-after: avoid;
    page-break-after: avoid;
  }

  .section-header img {
    height: 33px;
    width: 6px;
  }

  .section-title {
    color: #016b68;
    font-size: 2.5rem;
    margin: 0;
  }

  .conditions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(45%, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .page-section {
    margin-bottom: 2rem;
    break-inside: avoid;
  }

  .conditions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(45%, 1fr));
    gap: 1.5rem;
  }

  /* Update the .row class inside the last category box */
  .box .row {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 20px 0;
  }

  .box .row > div {
    width: 100%;
    text-align: right;
  }

  .box .row p {
    margin: 10px 0;
    font-size: 14px;
    line-height: 1.5;
  }

  @media print {
    @page {
      size: A4 portrait !important; /* Change to portrait */
      margin: 0.3cm;
    }

    body {
      margin: 0;
      padding: 0;
      background: white;
    }

    .page-section {
      page-break-before: auto !important; /* Changed from always */
      page-break-after: auto !important; /* Changed from always */
      page-break-inside: avoid !important;
      padding: 0.5cm;
      margin: 0;
      min-height: 297mm !important; /* A4 height */
      width: 210mm !important; /* A4 width */
      display: flex;
      flex-direction: column;
    }

    /* Only force page break before new sections (except first) */
    .page-section:not(:first-child) {
      page-break-before: always !important;
    }

    /* Ensure proper container sizing */
    .conditions-grid {
      height: auto !important;
      min-height: 0 !important;
      margin-bottom: 0 !important;
    }

    /* Remove any forced height calculations */
    [class*="calc"] {
      height: auto !important;
      min-height: 0 !important;
    }

    .section-header {
      margin-bottom: 0.5cm;
    }

    .section-title {
      font-size: 1.8rem;
    }

    .conditions-grid {
      display: grid !important;
      grid-template-columns: repeat(2, 1fr) !important;
      grid-template-rows: repeat(4, auto) !important;
      gap: 0.4cm !important;
      height: auto !important;
      min-height: calc(297mm - 4cm) !important;
    }

    .cond {
      transform: scale(0.9);
      transform-origin: top right;
      margin: 0 !important;
      padding: 0.2cm !important;
      height: auto !important;
      min-height: calc((297mm - 6cm) / 4) !important;
      display: flex !important;
      flex-direction: column !important;
    }

    /* Make boxes more compact */
    .box {
      height: auto !important;
      min-height: 0 !important;
      padding: 0.3rem !important;
      margin-bottom: 0.2rem !important;
      flex: 1 !important;
      display: flex !important;
      flex-direction: column !important;
    }

    .header {
      height: auto !important;
      gap: 0.2rem !important;
      margin-bottom: 0.2rem !important;
    }

    .header-title {
      font-size: 10px !important;
    }

    .header-body {
      font-size: 14px !important;
    }

    .content {
      gap: 0.2rem !important;
      flex: 1 !important;
      min-height: calc((297mm - 10cm) / 4 - 3rem) !important;
      padding: 0.3rem !important;
    }

    .content p {
      font-size: 11px !important;
      line-height: 1.2 !important;
      margin: 0.1rem 0 !important;
    }

    .content img {
      max-width: 25% !important;
      left: 0;
    }

    .check p {
      font-size: 11px !important;
    }

    /* Handle special full-width cases */
    .cond[style*="flex: 1 1 100%"] {
      grid-column: span 2;
      min-height: calc((297mm - 6cm) / 2) !important;
    }

    .cond[style*="flex: 1 1 100%"] .box {
      min-height: calc((297mm - 8cm) / 2 - 2rem) !important;
    }

    /* Force items to fit in container */
    .conditions-grid > * {
      overflow: hidden !important;
      display: flex !important;
      flex-direction: column !important;
    }

    /* Ensure backgrounds print */
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }

    /* Adjust checkbox size */
    .checkbox-wrapper-19 {
      --checkbox-height: 20px !important;
    }

    /* Remove any fixed heights */
    [style*="height"] {
      height: auto !important;
      min-height: 0 !important;
    }

    /* Optimize section header */
    .section-header {
      margin-bottom: 0.3cm !important;
      gap: 5px !important;
      height: auto !important;
      min-height: 0 !important;
    }

    .section-header img {
      height: 20px !important;
      width: 4px !important;
    }

    .section-title {
      font-size: 1.4rem !important;
      margin: 0 !important;
    }

    /* Optimize condition headers */
    .header {
      height: auto !important;
      min-height: 0 !important;
      padding: 0.1rem !important;
      margin-bottom: 0.2rem !important;
      gap: 5px !important;
    }

    .header img {
      height: 25px !important;
      width: auto !important;
    }

    .header-title {
      font-size: 8px !important;
      width: auto !important;
      margin: 0 !important;
    }

    .header-body {
      font-size: 12px !important;
      margin: 0 !important;
      line-height: 1.2 !important;
    }

    .main-header {
      display: flex !important;
      flex-direction: column !important;
    }

    .page-section {
      padding: 0.3cm 0.5cm !important;
    }

    .conditions-grid {
      margin-top: 0.2cm !important;
    }

    /* More compact boxes */
    .box {
      padding: 0.2rem !important;
    }

    /* Adjust content and images */
    .content {
      gap: 0.2rem !important;
      padding-bottom: 0.3rem !important;
    }

    .content img {
      max-width: 22% !important;
      height: auto !important;
      align-self: flex-start !important;
      margin-top: 0.2rem !important;
    }

    .box {
      padding: 0.2rem !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
    }

    .content-body {
      margin-bottom: 0 !important;
      padding-bottom: 0 !important;
    }

    /* Special case for larger content areas */
    .cond[style*="flex: 1 1 100%"] .content img {
      max-width: 20% !important;
    }

    /* Adjust vertical spacing */
    .box::after {
      margin-bottom: 0.3rem !important;
    }

    /* Adjust content layout */
    .content {
      flex-direction: row-reverse !important;
      justify-content: flex-start !important;
      gap: 0.5rem !important;
      align-items: flex-start !important;
    }

    .content > div {
      flex: 1 !important;
      min-width: 65% !important;
    }

    .content img {
      max-width: 20% !important;
      margin-right: 0 !important;
      margin-left: 0.5rem !important;
      align-self: flex-start !important;
    }

    /* Special case for larger content */
    .cond[style*="flex: 1 1 100%"] .content {
      flex-direction: row-reverse !important;
    }

    .cond[style*="flex: 1 1 100%"] .content img {
      max-width: 18% !important;
    }

    /* Remove any margins that might interfere */
    .content > * {
      margin: 0 !important;
    }

    /* Ensure text alignment */
    .content-body {
      text-align: right !important;
      padding-left: 0.5rem !important;
      font-size: 10pt !important;
      line-height: 1.3 !important;
    }

    /* Adjust grid spacing */
    .conditions-grid {
      gap: 0.2cm !important;
      margin-top: 0.1cm !important;
    }

    /* Update content layout */
    .content {
      flex-direction: row !important; /* Remove reverse to keep images on left */
      justify-content: flex-start !important;
      gap: 0.8rem !important;
      align-items: center !important;
      padding: 0.2rem !important;
    }

    /* Adjust image sizing and positioning */
    .content img {
      max-width: 28% !important;
      height: auto !important;
      order: -1 !important; /* Force image to left side */
      margin: 0 !important;
      align-self: center !important;
    }

    /* Text content adjustments */
    .content > div {
      flex: 1 !important;
      min-width: 60% !important;
      margin-right: 0.5rem !important;
    }

    /* Special cases for full-width boxes */
    .cond[style*="flex: 1 1 100%"] .content img {
      max-width: 25% !important;
    }

    /* Reduce vertical spacing between conditions */
    .cond {
      padding: 0.1cm !important;
      margin-bottom: 0.1cm !important;
    }

    .box {
      margin-bottom: 0.1rem !important;
    }

    /* Fix page break and overflow issues */
    .page-section {
      page-break-before: auto !important;
      page-break-after: avoid !important; /* Changed from auto to avoid */
      page-break-inside: avoid !important;
      min-height: auto !important; /* Remove fixed height */
      height: auto !important;
      padding: 0.5cm !important;
      margin: 0 !important;
      overflow: visible !important;
    }

    /* Only force first page break */
    .page-section:not(:first-child) {
      page-break-before: always !important;
    }

    /* Adjust grid layout */
    .conditions-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      grid-template-rows: auto !important; /* Remove fixed rows */
      gap: 0.4cm !important;
      height: auto !important;
      min-height: 0 !important;
      margin: 0 0 1cm 0 !important;
    }

    /* Remove all fixed height calculations */
    [class*="calc"],
    [style*="height"],
    [style*="min-height"] {
      height: auto !important;
      min-height: 0 !important;
    }
  }

  @media print {
    @page {
      size: A4 portrait !important;
      margin: 0.3cm;
    }

    /* Remove empty pages and fix layout */
    .page-section {
      display: block !important;
      position: relative !important;
      break-before: auto !important;
      break-after: auto !important;
      break-inside: avoid !important;
      page-break-before: auto !important;
      page-break-after: auto !important;
      page-break-inside: avoid !important;
      height: auto !important;
      min-height: 0 !important;
      margin: 0 0 1cm 0 !important;
      padding: 0.5cm !important;
    }

    /* Force new page only for sections after first */
    .page-section + .page-section {
      page-break-before: always !important;
    }

    /* Fix content layout */
    .content {
      display: flex !important;
      flex-direction: row !important; /* Normal direction */
      gap: 0.5rem !important;
      align-items: flex-start !important;
      padding: 0.3rem !important;
    }

    /* Position image to left */
    .content img {
      order: -1 !important;
      max-width: 30% !important;
      height: auto !important;
      margin: 0 !important;
      float: left !important;
    }

    /* Adjust text content */
    .content > div {
      flex: 1 !important;
      padding-right: 0.5rem !important;
    }

    /* Handle grid layout */
    .conditions-grid {
      display: grid !important;
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 0.4cm !important;
      height: auto !important;
      margin: 0 !important;
    }

    /* Remove any fixed heights */
    [style*="height"],
    [style*="min-height"],
    [class*="calc"] {
      height: auto !important;
      min-height: 0 !important;
    }
  }

  @media print {
    @page {
      size: A4 portrait !important;
      margin: 0.1cm;
    }

    .page-section {
      position: relative !important;
      page-break-before: auto !important;
      page-break-after: avoid !important;
      page-break-inside: avoid !important;
      break-before: auto !important;
      break-after: avoid !important;
      break-inside: avoid !important;
      height: auto !important;
      min-height: unset !important;
      max-height: none !important;
      margin: 0 !important;
      padding: 1cm 0.5cm !important;
      display: block !important;
      overflow: visible !important;
    }

    /* Only force page break between sections */
    .page-section + .page-section {
      page-break-before: always !important;
    }

    /* Adjust grid container */
    .conditions-grid {
      display: grid !important;
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 0.1cm !important;
      height: auto !important;
      min-height: unset !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    /* Fix content height issues */
    .content,
    .box,
    .cond {
      height: auto !important;
      min-height: unset !important;
      max-height: none !important;
    }

    /* Ensure images appear on left */
    .content {
      display: flex !important;
      flex-direction: row !important;
      align-items: flex-start !important;
      gap: 0.5rem !important;
    }

    .content img {
      /* order: -1 !important; */
      max-width: 30% !important;
      height: auto !important;
    }

    /* Remove all fixed heights and calcs */
    [style*="height"],
    [style*="min-height"],
    [style*="max-height"],
    [class*="calc"] {
      height: auto !important;
      min-height: unset !important;
      max-height: none !important;
    }
  }

  @media print {
    @page {
      size: A4 portrait !important;
      margin: 0.3cm;
    }

    /* Ensure consistent content layout */
    .content {
      display: flex !important;
      flex-direction: row !important; /* Force direction */
      justify-content: flex-start !important;
      align-items: flex-start !important;
      gap: 1rem !important;
      padding: 0.3rem !important;
    }

    /* Force image to left side */
    .content img {
      order: -1 !important;
      width: 35% !important;
      max-width: 35% !important;
      height: auto !important;
      margin: 0 !important;
      align-self: flex-start !important;
      object-fit: contain !important;
    }

    /* Text content alignment */
    .content > div {
      flex: 1 !important;
      margin-right: 0 !important;
      padding-right: 0.5rem !important;
    }

    .content-body {
      text-align: right !important;
      margin: 0 !important;
    }

    /* Remove any interfering styles */
    .content,
    .content *,
    .box * {
      float: none !important;
      transform: none !important;
    }

    /* Override any direction changes */
    .box {
      direction: ltr !important;
    }

    .content-body {
      direction: rtl !important;
    }
  }

  @media print {
    @page {
      size: A4 portrait !important;
      margin: 0.5cm !important;
    }

    /* Fix page layout */
    .page-section {
      page-break-before: auto !important;
      page-break-inside: avoid !important;
      page-break-after: auto !important;
      margin: 0 !important;
      padding: 0.5cm !important;
      display: block !important;
      position: relative !important;
      min-height: auto !important;
      height: auto !important;
      width: auto !important;
    }

    /* Force page breaks between sections */
    .page-section + .page-section {
      page-break-before: always !important;
    }

    /* Grid layout adjustments */
    .conditions-grid {
      display: grid !important;
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 0.4cm !important;
      margin: 0 !important;
      padding: 0 !important;
      height: auto !important;
    }

    /* Box adjustments */
    .box {
      height: auto !important;
      min-height: 0 !important;
      page-break-inside: avoid !important;
      display: flex !important;
      flex-direction: column !important;
    }

    /* Remove transforms that might cause issues */
    .cond {
      transform: none !important;
      height: auto !important;
    }

    /* Ensure content is visible */
    * {
      overflow: visible !important;
    }

    /* Remove height calculations */
    [style*="height"],
    [style*="min-height"],
    [style*="max-height"],
    [class*="calc"] {
      height: auto !important;
      min-height: 0 !important;
      max-height: none !important;
    }

    /* Footer adjustments */
    .footer {
      max-height: 1.5rem !important;
      padding: 0 !important;
      margin: 0 !important;
      display: flex !important;
      justify-content: space-around !important;
      align-items: center !important;
      white-space: nowrap !important;
    }

    .check {
      margin: 0 0.5rem !important;
      gap: 5px !important;
      height: 100% !important;
      align-items: center !important;
    }

    .check p {
      font-size: 8px !important;
      margin: 0 !important;
      padding: 0 !important;
      line-height: 1 !important;
    }

    .checkbox-wrapper-19 {
      --checkbox-height: 15px !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    /* Adjust box bottom spacing */
    .box {
      /* ...existing box styles... */
      padding-bottom: 1.5rem !important;
    }

    /* Container holding the footer */
    [style*="background-color: #ddefec"] {
      max-height: 1.5rem !important;
      height: 1.5rem !important;
      overflow: hidden !important;
      margin-top: -1px !important;
    }
  }

  @media print {
    /* Default image size for all sections */
    .content img {
      max-width: 30% !important;
      width: auto !important;
      height: auto !important;
    }

    /* Larger images specifically for second page-section */
    .page-section:nth-of-type(2) .content img {
      max-width: 40% !important;
      width: auto !important;
      height: auto !important;
    }

    /* Adjust content div width for second page-section to accommodate larger images */
    .page-section:nth-of-type(2) .content > div {
      min-width: 55% !important;
    }
  }

  @media print {
    /* Add specific selector for slide1image2 */
    img[src*="slide1image2"] {
      max-width: 28% !important;
      max-height: 3cm !important; /* Reduce height */
      width: auto !important;
      height: auto !important;
      object-fit: contain !important;
    }

    /* Adjust content container for this specific case */
    img[src*="slide1image2"] + div,
    img[src*="slide1image2"] ~ div {
      min-height: 3cm !important;
    }
  }
`;

const ArcReport = ({ visualCategoryStatus }) => {
  useEffect(() => {
    console.log(visualCategoryStatus);
  }, [visualCategoryStatus]);

  return (
    <StyleWrapper style={{ direction: "rtl" }}>
      <div className="page-section">
        <div className="section-header">
          <img src="./3d-conditions_images/image.png" alt="" />
          <h1 className="section-title">المتطلبات المعمارية</h1>
        </div>
        <div className="conditions-grid">
          <div className="cond">
            <div className="header">
              <img src="./3d-conditions_images/house.png" />
              <div className="main-header">
                <p className="header-title">الفراغات الداخلية</p>
                <p className="header-body">مساحة الغرف السكنية</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: "50%" }}>
                  <p className="content-body">
                    يجب الا تقل مساحة ارضية الغرف السكنية عن 6.5 م2.
                    <br />
                    <br />
                    لا يقل اي بعد افقي للغرف السكنية عن 2.1 م يستثنى المطبخ
                    والحمامات ودورات المياه.
                    <span>2.1 م</span>.
                  </p>
                </div>
                <img src="/3d-conditions_images/slide1image1.png" alt="" />
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#ddefec !important",
                borderRadius: "0 0 25px 25px !important",
                maxHeight: "2.8rem",
              }}
            >
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input
                      type="checkbox"
                      id="مساحة الغرف السكنية 1"
                      checked={visualCategoryStatus["مساحة الغرف السكنية"] === true}
                      readOnly
                    />
                    <label htmlFor="مساحة الغرف السكنية 1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input
                      type="checkbox"
                      id="مساحة الغرف السكنية -1"
                      checked={visualCategoryStatus["مساحة الغرف السكنية"] === false}
                      readOnly
                    />
                    <label htmlFor="مساحة الغرف السكنية -1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input
                      type="checkbox"
                      id="مساحة الغرف السكنية 0"
                      checked={visualCategoryStatus["مساحة الغرف السكنية"] === null}
                      readOnly
                    />
                    <label htmlFor="مساحة الغرف السكنية 0" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="./3d-conditions_images/house.png" alt="" />
              <div className="main-header">
                <p className="header-title">الفراغات الداخلية</p>
                <p className="header-body">الممرات الداخلية</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: "50%" }}>
                  <p className="content-body">
                    لا يقل عرض الممرات الداخلية عن 0.9 م
                  </p>
                </div>
                <img src="/3d-conditions_images/slide1image2.png" alt="" />
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#ddefec !important",
                borderRadius: "0 0 25px 25px !important",
                maxHeight: "2.8rem",
              }}
            >
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input
                      type="checkbox"
                      id="الممرات الداخلية 1"
                      checked={visualCategoryStatus["الممرات الداخلية"] === true}
                      readOnly
                    />
                    <label htmlFor="الممرات الداخلية 1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input
                      type="checkbox"
                      id="الممرات الداخلية -1"
                      checked={visualCategoryStatus["الممرات الداخلية"] === false}
                      readOnly
                    />
                    <label htmlFor="الممرات الداخلية -1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input
                      type="checkbox"
                      id="الممرات الداخلية 0"
                      checked={visualCategoryStatus["الممرات الداخلية"] === null}
                      readOnly
                    />
                    <label htmlFor="الممرات الداخلية 0" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="./3d-conditions_images/house.png" alt="" />
              <div className="main-header">
                <p className="header-title">الفراغات الداخلية</p>
                <p className="header-body">الارتفاعات الداخلية</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: "50%" }}>
                  <p className="content-body">
                    يجب الالتزام بالحد الأدنى لصافي الارتفاع الداخلي للدور
                    الواحد مقاساً من مستوى السطح النهائي للأرضية حتى بطنية سقفه
                    الظاهر في جميع الأدوار
                    <br />
                    <br />
                    <br />
                    لا يقل ارتفاع سقف الغرف السكنية والممرات والطوابق السفلية عن
                    <span>2.1 م</span>.
                  </p>
                </div>
                <img src="/3d-conditions_images/slide1images3.png" alt="" />
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#ddefec !important",
                borderRadius: "0 0 25px 25px !important",
                maxHeight: "2.8rem",
              }}
            >
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input
                      type="checkbox"
                      id="الارتفاعات الداخلية 1"
                      checked={visualCategoryStatus["الارتفاعات الداخلية"] === true}
                      readOnly
                    />
                    <label htmlFor="الارتفاعات الداخلية 1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input
                      type="checkbox"
                      id="الارتفاعات الداخلية -1"
                      checked={visualCategoryStatus["الارتفاعات الداخلية"] === false}
                      readOnly
                    />
                    <label htmlFor="الارتفاعات الداخلية -1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input
                      type="checkbox"
                      id="الارتفاعات الداخلية 0"
                      checked={visualCategoryStatus["الارتفاعات الداخلية"] === null}
                      readOnly
                    />
                    <label htmlFor="الارتفاعات الداخلية 0" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="./3d-conditions_images/house.png" alt="" />
              <div className="main-header">
                <p className="header-title">الفراغات الداخلية</p>
                <p className="header-body">الإضاءة الطبيعية</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: "60%" }}>
                  <p className="content-body">
                    <br />
                    يجب ألا تقل مساحة الزجاج المستخدم للإضاءة الطبيعية عن
                    <span>(8%)</span> من مساحة أرضية الغرفة، ولا يقل الجزء
                    القابل للفتح عن<span> 4%</span> من مساحة الغرفة (للتهوية
                    الطبيعية).
                    <br />
                    <br />
                    <br />
                    يجب لا تقل مساحة نوافذ دورات المياه والحمامات عن
                    <span> 0.30م2،</span> ويكون نصفها قابل للفتح.
                  </p>
                </div>
                <img src="/3d-conditions_images/slide1image4.png" alt="" />
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#ddefec !important",
                borderRadius: "0 0 25px 25px !important",
                maxHeight: "2.8rem",
              }}
            >
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input
                      type="checkbox"
                      id="الإضاءة الطبيعية 1"
                      checked={visualCategoryStatus["الإضاءة الطبيعية"] === true}
                      readOnly
                    />
                    <label htmlFor="الإضاءة الطبيعية 1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input
                      type="checkbox"
                      id="الإضاءة الطبيعية -1"
                      checked={visualCategoryStatus["الإضاءة الطبيعية"] === false}
                      readOnly
                    />
                    <label htmlFor="الإضاءة الطبيعية -1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input
                      type="checkbox"
                      id="الإضاءة الطبيعية 0"
                      checked={visualCategoryStatus["الإضاءة الطبيعية"] === null}
                      readOnly
                    />
                    <label htmlFor="الإضاءة الطبيعية 0" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="./3d-conditions_images/house.png" alt="" />
              <div className="main-header">
                <p className="header-title">الفراغات الداخلية</p>
                <p className="header-body">داربزين الحماية</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: "50%" }}>
                  <p className="content-body">
                    يجب أن لا يقل ارتفاع درابزين الشرفات والسلالم المفتوحة في
                    الفلل السكنية عن <span> ( من 0.85 م إلى 0.95 م)</span>.
                  </p>
                </div>
                <img src="/3d-conditions_images/slide1imaeg5.png" alt="" />
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#ddefec !important",
                borderRadius: "0 0 25px 25px !important",
                maxHeight: "2.8rem",
              }}
            >
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input
                      type="checkbox"
                      id="داربزين الحماية 1"
                      checked={visualCategoryStatus["داربزين الحماية"] === true}
                      readOnly
                    />
                    <label htmlFor="داربزين الحماية 1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input
                      type="checkbox"
                      id="داربزين الحماية -1"
                      checked={visualCategoryStatus["داربزين الحماية"] === false}
                      readOnly
                    />
                    <label htmlFor="داربزين الحماية -1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input
                      type="checkbox"
                      id="داربزين الحماية 0"
                      checked={visualCategoryStatus["داربزين الحماية"] === null}
                      readOnly
                    />
                    <label htmlFor="داربزين الحماية 0" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="./3d-conditions_images/house.png" alt="" />
              <div className="main-header">
                <p className="header-title">الفراغات الداخلية</p>
                <p className="header-body">ارتفاع المبنى</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: "54%" }}>
                  <p className="content-body">
                    مراجعة الارتفاع الكلي للفيلا السكنية وفقاً لاشتراطات
                    الامانات والبلديات
                  </p>
                </div>
                <img
                  src="/3d-conditions_images/slide1image6.png"
                  alt=""
                  style={{ marginLeft: "1rem" }}
                />
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#ddefec !important",
                borderRadius: "0 0 25px 25px !important",
                maxHeight: "2.8rem",
              }}
            >
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input
                      type="checkbox"
                      id="ارتفاع المبنى 1"
                      checked={visualCategoryStatus["ارتفاع المبنى"] === true}
                      readOnly
                    />
                    <label htmlFor="ارتفاع المبنى 1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input
                      type="checkbox"
                      id="ارتفاع المبنى -1"
                      checked={visualCategoryStatus["ارتفاع المبنى"] === false}
                      readOnly
                    />
                    <label htmlFor="ارتفاع المبنى -1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input
                      type="checkbox"
                      id="ارتفاع المبنى 0"
                      checked={visualCategoryStatus["ارتفاع المبنى"] === null}
                      readOnly
                    />
                    <label htmlFor="ارتفاع المبنى 0" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="./3d-conditions_images/house.png" alt="" />
              <div className="main-header">
                <p className="header-title">الفراغات الداخلية</p>
                <p className="header-body">سترة السطح</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: "50%" }}>
                  <p className="content-body">
                    <br />
                    الحد الأدنى لارتفاع سترة السطح <span> (1.70م)</span>، والحد
                    الأعلى <span>(2م)</span> مقاساً من منسوب أرضية السطح.
                    <br />
                    <br />
                    <br />
                    الحد الأدنى لارتفاع سترة ملحق السطح <span>(0.4 م)</span>
                    {"{"}" "{"}"}
                    والحد الأعلى <span>(0.8 م)</span>
                  </p>
                </div>
                <img src="/3d-conditions_images/slide1imaeg7.png" alt="" />
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#ddefec !important",
                borderRadius: "0 0 25px 25px !important",
                maxHeight: "2.8rem",
              }}
            >
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input
                      type="checkbox"
                      id="سترة السطح 1"
                      checked={visualCategoryStatus["سترة السطح"] === true}
                      readOnly
                    />
                    <label htmlFor="سترة السطح 1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input
                      type="checkbox"
                      id="سترة السطح -1"
                      checked={visualCategoryStatus["سترة السطح"] === false}
                      readOnly
                    />
                    <label htmlFor="سترة السطح -1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input
                      type="checkbox"
                      id="سترة السطح 0"
                      checked={visualCategoryStatus["سترة السطح"] === null}
                      readOnly
                    />
                    <label htmlFor="سترة السطح 0" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="./3d-conditions_images/house.png" alt="" />
              <div className="main-header">
                <p className="header-title">الفراغات الداخلية</p>
                <p className="header-body">المدخل الخارجي</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: "65%" }}>
                  <p className="content-body">
                    يجب توفير ما لا يقل عن باب خروج واحد لكل وحدة سكنية، كما يجب
                    عمل باب الخروج بمفصالات جانبية، وبعرض صافي لا يقل عن
                    <span>0.8 م</span> تقاس من واجهة الباب إلى أخر نقطة له وذلك
                    في حال فتح الباب بزاوية <span>90</span> درجة وفيما يخص
                    الارتفاع ا الباب فلابد الا يقل عن <span>1.950 م</span> تقاس
                    من اعلى العتبة إلى اسفلها. ولا يلزم التزام الأبواب الأخرى
                    بهذه الأبعاد الدقيقة.
                    <br />
                    <br />
                    يجب الحرص على إمكانية فتح أبواب الخروج بسهولة من داخل المسكن
                    دون الحاجة إلى مفتاح او بذل مجهود كبير.
                  </p>
                </div>
                <img src="/3d-conditions_images/slide1image8.png" alt="" />
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#ddefec !important",
                borderRadius: "0 0 25px 25px !important",
                maxHeight: "2.8rem",
              }}
            >
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input
                      type="checkbox"
                      id="المدخل الخارجي 1"
                      checked={visualCategoryStatus["المدخل الخارجي"] === true}
                      readOnly
                    />
                    <label htmlFor="المدخل الخارجي 1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input
                      type="checkbox"
                      id="المدخل الخارجي -1"
                      checked={visualCategoryStatus["المدخل الخارجي"] === false}
                      readOnly
                    />
                    <label htmlFor="المدخل الخارجي -1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input
                      type="checkbox"
                      id="المدخل الخارجي 0"
                      checked={visualCategoryStatus["المدخل الخارجي"] === null}
                      readOnly
                    />
                    <label htmlFor="المدخل الخارجي 0" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-section">
        <div className="section-header">
          <img src="./3d-conditions_images/image.png" alt="" />
          <h1 className="section-title">المتطلبات المعمارية</h1>
        </div>
        <div className="conditions-grid">
          <div className="cond">
            <div className="header">
              <img src="./3d-conditions_images/house.png" alt="" />
              <div className="flex">
                <p className="header-title">الفراغات الداخلية</p>
                <p className="header-body">نسب البناء</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: '40%' }}>
                  <p className="content-body">
                    <br />
                    <br />
                    مراجعة نسبة البناء في الدور الأرضي والأول وفقاً لاشتراطات
                    الامانات والبلديات.
                    <br />
                    <br />
                    يسمح بعمل ملحق ارضي وذلك وفقاً لاشتراطات الامانات والبلديات.
                  </p>
                </div>
                <img src="/3d-conditions_images/slide2image1.png" alt="" />
              </div>
            </div>
            <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem' }}>
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={visualCategoryStatus["نسب البناء"] === true}

                      readOnly
                      id="cbtest-1" />
                    <label htmlFor="cbtest-1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={visualCategoryStatus["نسب البناء"] === false}

                      readOnly
                      id="cbtest-2" />
                    <label htmlFor="cbtest-2" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={visualCategoryStatus["نسب البناء"] === null}

                      readOnly
                      id="cbtest-3" />
                    <label htmlFor="cbtest-3" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="./3d-conditions_images/house.png" alt="" />
              <div className="flex">
                <p className="header-title">الفراغات الداخلية</p>
                <p className="header-body">الارتداد في حالة شوارع جانبية</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: '45%' }}>
                  <p className="content-body">
                    <br />
                    <br />
                    <br />
                    مراجعة الارتدادت وفقاً لاشتراطات الامانات والبلديات.
                    <br />
                    يسمح بعمل بروز وذلك وفقا لاشتراطات الامانات والبلديات.
                  </p>
                </div>
                <img src="/3d-conditions_images/slide2image2.png" alt="" />
              </div>
            </div>
            <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem' }}>
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={visualCategoryStatus["الارتداد في حالة شوارع جانبية"] === true}

                      readOnly
                      id="cbtest-4" />
                    <label htmlFor="cbtest-4" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={visualCategoryStatus["الارتداد في حالة شوارع جانبية"] === false}

                      readOnly
                      id="cbtest-5" />
                    <label htmlFor="cbtest-5" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={visualCategoryStatus["الارتداد في حالة شوارع جانبية"] === true}

                      readOnly
                      id="cbtest-6" />
                    <label htmlFor="cbtest-6" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="./3d-conditions_images/house.png" alt="" />
              <div className="flex">
                <p className="header-title">الفراغات الداخلية</p>
                <p className="header-body">ملحق علوي</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: '50%' }}>
                  <p className="content-body">
                    يجب أن يكون الملحق العلوي مطابقاً لاشتراطات الأمانات
                    والبلديات.
                  </p>
                </div>
                <img src="/3d-conditions_images/slide2image3.png" alt="" />
              </div>
            </div>
            <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem' }}>
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-16" />
                    <label htmlFor="cbtest-16" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-17" />
                    <label htmlFor="cbtest-17" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-18" />
                    <label htmlFor="cbtest-18" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="./3d-conditions_images/house.png" alt="" />
              <div className="flex">
                <p className="header-title">الفراغات الداخلية</p>
                <p className="header-body">الارتداد في حالة الجار</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: '50%' }}>
                  <p className="content-body">
                    يجب مراجعة الارتدادات وفقاً لاشتراطات الأمانات والبلديات.
                  </p>
                </div>
                <img src="/3d-conditions_images/slide2image4.png" alt="" />
              </div>
            </div>
            <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem' }}>
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-19" />
                    <label htmlFor="cbtest-19" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-20" />
                    <label htmlFor="cbtest-20" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-21" />
                    <label htmlFor="cbtest-21" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="./3d-conditions_images/house.png" alt="" />
              <div className="flex">
                <p className="header-title">الفراغات الداخلية</p>
                <p className="header-body">دور القبو</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: '50%' }}>
                  <p className="content-body">
                    يجب أن يكون دور القبو مطابقاً لاشتراطات الأمانات والبلديات.
                  </p>
                </div>
                <img src="/3d-conditions_images/slide2image5.png" alt="" />
              </div>
            </div>
            <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem' }}>
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-22" />
                    <label htmlFor="cbtest-22" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-23" />
                    <label htmlFor="cbtest-23" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-24" />
                    <label htmlFor="cbtest-24" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="./3d-conditions_images/house.png" alt="" />
              <div className="flex">
                <p className="header-title">الفراغات الداخلية</p>
                <p className="header-body">ارتداد الملحق العلوي</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: '50%' }}>
                  <p className="content-body">
                    يجب مراجعة ارتداد الملحق العلوي وفقاً لاشتراطات الأمانات
                    والبلديات.
                  </p>
                </div>
                <img src="/3d-conditions_images/slide2image6.png" alt="" />
              </div>
            </div>
            <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem' }}>
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-25" />
                    <label htmlFor="cbtest-25" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-26" />
                    <label htmlFor="cbtest-26" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-27" />
                    <label htmlFor="cbtest-27" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="./3d-conditions_images/house.png" alt="" />
              <div className="flex">
                <p className="header-title">الفراغات الداخلية</p>
                <p className="header-body">الارتداد الأمامي</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: '50%' }}>
                  <p className="content-body">
                    يجب مراجعة الارتداد الأمامي وفقاً لاشتراطات الأمانات
                    والبلديات.
                  </p>
                </div>
                <img src="/3d-conditions_images/slide2image7.png" alt="" />
              </div>
            </div>
            <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem' }}>
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-28" />
                    <label htmlFor="cbtest-28" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-29" />
                    <label htmlFor="cbtest-29" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-30" />
                    <label htmlFor="cbtest-30" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="./3d-conditions_images/house.png" alt="" />
              <div className="flex">
                <p className="header-title">الفراغات الداخلية</p>
                <p className="header-body">الشطفة الخارجية</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: '50%' }}>
                  <p className="content-body">
                    يجب مراجعة الشطفة الخارجية وفقاً لاشتراطات الأمانات والبلديات.
                  </p>
                </div>
                <img src="/3d-conditions_images/slide2image8.png" alt="" />
              </div>
            </div>
            <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem' }}>
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-31" />
                    <label htmlFor="cbtest-31" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-32" />
                    <label htmlFor="cbtest-32" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-33" />
                    <label htmlFor="cbtest-33" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-section">
        <div className="section-header">
          <img src="./3d-conditions_images/image.png" alt="" />
          <h1 className="section-title">المتطلبات المعمارية</h1>
        </div>
        <div className="conditions-grid">
          <div className="cond">
            <div className="header">
              <img src="./3d-conditions_images/house.png" alt="" />
              <div className="flex">
                <p className="header-title">المتطلبات الخارجية</p>
                <p className="header-body">السور الخارجي</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: '50%' }}>
                  <p className="content-body">
                    مراجعة شكل وارتفاعات السور الخارجي وفقاً لاشتراطات الامانات
                    والبلديات.
                  </p>
                </div>
                <img src="/3d-conditions_images/slide3image1.png" alt="" />
              </div>
            </div>
            <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem' }}>
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-7" />
                    <label htmlFor="cbtest-7" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-8" />
                    <label htmlFor="cbtest-8" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-9" />
                    <label htmlFor="cbtest-9" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="./3d-conditions_images/house.png" alt="" />
              <div className="flex">
                <p className="header-title">متطلبات السلالم</p>
                <p className="header-body">عرض السلالم الداخلية</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: '50%' }}>
                  <p className="content-body">
                    الحد الأدنى لصافي عرض الدرج الرئيسي والبسطة 0.9م في الفلل
                    السكنية.
                  </p>
                </div>
                <img src="/3d-conditions_images/slide3image2.png" alt="" />
              </div>
            </div>
            <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem' }}>
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-10" />
                    <label htmlFor="cbtest-10" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-11" />
                    <label htmlFor="cbtest-11" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-12" />
                    <label htmlFor="cbtest-12" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="./3d-conditions_images/house.png" alt="" />
              <div className="flex">
                <p className="header-title">متطلبات السلالم</p>
                <p className="header-body">أبعاد الدرج</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: '50%' }}>
                  <p className="content-body">
                    الحد الأقصى لارتفاع الدرجة الواحدة (القائم) لا تزيد عن 0.18 م،
                    والحد الأدنى لعرض الدرجة (النائمة) لا تقل عن 0.25 م وفق
                    متطلبات واشتراطات كود البناء السعودي.
                  </p>
                </div>
                <img src="/3d-conditions_images/slide3image3.png" alt="" />
              </div>
            </div>
            <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem' }}>
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-13" />
                    <label htmlFor="cbtest-13" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-14" />
                    <label htmlFor="cbtest-14" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-15" />
                    <label htmlFor="cbtest-15" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cond" style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>
          <div className="header">
            <img src="./3d-conditions_images/house.png" alt="" />
            <div className="flex">
              <p className="header-title">متطلبات المناور</p>
              <p className="header-body">متطلبات المناور الداخلية</p>
            </div>
          </div>
          <div className="box" style={{ height: '35rem' }}>
            <div className="content">
              <div style={{ minWidth: '50%' }}>
                <p className="content-body">
                  يسمح بالتهوية الميكانيكية والاضاءة الصناعية للحمامات ودورات
                  المياه و لا يشترط وجود مناور. يجب أن يبقى المنور مكشوفاً لكل
                  الأدوار ولا يسمح بتغطيته أو البناء فوقه بأي ارتفاع ويزود
                  بالتجهيزات اللازمة لصرف مياه الأمطار والغسيل.
                </p>
              </div>
              <img src="/3d-conditions_images/slide3image4.png" alt="" style={{ width: '45%' }} />
            </div>
            <div className="row" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ marginBottom: 20 }}>
                <p>المناور الداخلية بارتفاع (دورين)</p>
                <p>
                  منور بارتفاع دورين يحتوي على نوافذ تفتح من جهة واحدة أو جهتين
                  غير متقابلتين والحد الادنى للعرض 1.5 م والطول 1.8 م
                </p>
                <p>
                  منور بارتفاع دورين يحتوي على نوافذ تفتح من جهتين متقابلتين أو
                  على جميع الجهات والحد الادنى للعرض 1.8 م والطول 1.8 م
                </p>
              </div>
              <div>
                <p>المناور الداخلية بارتفاع (3 أدوار)</p>
                <p>
                  منور بارتفاع (3 أدوار) يحتوي على نوافذ تفتح من جهة واحدة أو
                  جهتين غير متقابلتين والحد الادنى للعرض 1.8 م والطول 2.4 م
                </p>
                <p>
                  منور بارتفاع (3 أدوار) يحتوي على نوافذ تفتح من جهتين متقابلتين
                  أو على جميع الجهات والحد الادنى للعرض 2.1 م والطول 2.4 م
                </p>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem', width: '100%' }}>
            <div className="footer">
              <div className="check">
                <p>تحقق</p>
                <div className="checkbox-wrapper-19">
                  <input type="checkbox" id="cbtest-34" />
                  <label htmlFor="cbtest-34" className="check-box" />
                </div>
              </div>
              <div className="check">
                <p>لم يتحقق</p>
                <div className="checkbox-wrapper-19">
                  <input type="checkbox" id="cbtest-35" />
                  <label htmlFor="cbtest-35" className="check-box" />
                </div>
              </div>
              <div className="check">
                <p>لا ينطبق</p>
                <div className="checkbox-wrapper-19">
                  <input type="checkbox" id="cbtest-36" />
                  <label htmlFor="cbtest-36" className="check-box" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    </StyleWrapper>
  );
};

export const ArcReportComponent = ({ visualCategoryStatus }) => {





  return <ArcReport visualCategoryStatus={visualCategoryStatus} />;
};

export default ArcReport;
