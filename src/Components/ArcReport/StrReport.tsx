import React, { forwardRef, useEffect, useState } from "react";
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
    max-height: 17rem;
    height: fit-content;
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
    .box2 {
    border-left: 4px #8080803d solid;
    border-top: 4px #8080803d solid;
    border-right: 4px #0a984586 solid;
    border-radius: 20px 0 0 0;
    padding: 1rem;
    position: relative;
  }

  .box2::after {
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
    gap: 10px;
    height: 70px;
    justify-content: start;
    margin-bottom: 0.5rem;
    align-items: end;
  }

  .header-title {
    color: #2f9a4f;
    text-align: right;
    margin: 0;
  }

  .header-body {
  text-align: right;
    font-size: 25px;
    font-weight: 800;
    color: gray;
    margin: 0;
  }

  .content {
  height: 100%;
    display: flex;
    align-items: center;
  }

  .content-body {
    text-align: right;
  }

  .content p {
    margin-left: 20px;
    font-size: 13px;
    font-weight: 500;
  }

  .footer {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background-color: #ddefec;
    border-radius: 0 0 25px 25px;
  }

    .footer1 {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: #ddefec;
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
    background: white !important;
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
      gap: 0.1rem !important;
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



interface ConditionStates {
  [key: string]: boolean;
}

const StrReport = forwardRef<HTMLDivElement>((props, ref) => {

  const [conditionStutes, setConditionState] = useState<ConditionStates>({});
  useEffect(() => {

    const storedData = localStorage.getItem("visualCategoryStatus");
    if (storedData) {
      setConditionState(JSON.parse(storedData));


    }



  }, []);
  return (
    <StyleWrapper ref={ref} style={{ direction: "rtl" }}> {/* ✅ Attach ref properly */}
      <div className="page-section">
        <img src="/header.png" style={{ width: '100%' }} alt="" />
        <div className="section-header">
          <img src="/3d-conditions_images/image.png" style={{ marginTop: '1rem' }} alt="" />
          <h1 className="section-title">   المتطلبات الإنشائية</h1>
        </div>
        <div className="conditions-grid">
          <div className="cond">
            <div className="header">
              <img src="/3d-conditions_images/house.png" />
              <div className="main-header">
                <p className="header-body"> العمود المستطيل</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: "50%" }}>
                  <p className="content-body">

                    يجب ألا يقل أقل بعد للمقطع العرضي للعمود المستطيل عن 0.2 م، ويجب إلا تزيد نسبة بعد المقطع العرضي الطويل إلى البعد القصير عن3، إلا في أنظمة عمود-بلاطة، حيث يجب ألا تتجاوز 2.

                  </p>
                </div>
                <img src="/Str/slide1image1.png" alt />
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
                    <input type="checkbox"
                      checked={
                        conditionStutes["العمود المستطيل"] === true}
                      readOnly
                      id="العمود المستطيل 1" />
                    <label
                      htmlFor="العمود المستطيل 1"
                      className="check-box"
                    />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" checked={
                      conditionStutes["العمود المستطيل"] === false}
                      readOnly id="العمود المستطيل -1" />
                    <label
                      htmlFor="العمود المستطيل -1"
                      className="check-box"
                    />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" checked={

                      !Object.prototype.hasOwnProperty.call(conditionStutes, "العمود المستطيل")}
                      readOnly id="العمود المستطيل 0" />
                    <label
                      htmlFor="العمود المستطيل 0"
                      className="check-box"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="/3d-conditions_images/house.png" alt />
              <div classname="main-header">
                <p className="header-body">العمود الدائري</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: "50%" }}>
                  <p className="content-body">
                    يجب أن يكون قطر الأعمدة ذات المقطع العرضي الدائري 0.3 م على الأقل.
                  </p>
                </div>
                <img src="/Str/slide1image2.png" alt />
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
                    <input type="checkbox" checked={
                      conditionStutes["العمود الدائري"] === true}
                      readOnly id="العمود الدائري 1" />
                    <label htmlFor="العمود الدائري 1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["العمود الدائري"] === false}
                      readOnly
                      id="العمود الدائري -1" />
                    <label
                      htmlFor="العمود الدائري -1"
                      className="check-box"
                    />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" checked={
                      !Object.prototype.hasOwnProperty.call(conditionStutes, "العمود الدائري")}
                      readOnly id="العمود الدائري 0" />
                    <label htmlFor="العمود الدائري 0" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="/3d-conditions_images/house.png" alt />
              <div classname="main-header">
                <p className="header-body">سمك الجدار</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: "50%" }}>
                  <p className="content-body">
                    يجب ألا يقل سمك الجدار عن 0.2 م.

                  </p>
                </div>
                <img src="/Str/slide1image3.png" alt />
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
                    <input type="checkbox"

                      checked={
                        conditionStutes["سمك الجدار"] === true}
                      readOnly
                      id="سمك الجدار 1" />
                    <label
                      htmlFor="سمك الجدار 1"
                      className="check-box"
                    />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" checked={
                      conditionStutes["سمك الجدار"] === false}
                      readOnly id="سمك الجدار -1" />
                    <label
                      htmlFor="سمك الجدار -1"
                      className="check-box"
                    />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" checked={
                      !Object.prototype.hasOwnProperty.call(conditionStutes, "سمك الجدار")}
                      readOnly id="سمك الجدار 0" />
                    <label
                      htmlFor="سمك الجدار 0"
                      className="check-box"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="/3d-conditions_images/house.png" alt />
              <div classname="main-header">
                <p className="header-body">بعد القاعدة الأصغر</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div >
                  <p className="content-body">
                    يجب أن يكون بعد القاعدة الأصغر 1.0 م.

                  </p>
                </div>
                <img src="/Str/slide1image4.png" alt />
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
                    <input type="checkbox" checked={
                      conditionStutes?.["بعد القاعدة الأصغر"] === true}
                      readOnly id="بعد القاعدة الأصغر 1" />
                    <label htmlFor="بعد القاعدة الأصغر 1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" checked={
                      conditionStutes["بعد القاعدة الأصغر"] === false}
                      readOnly id="بعد القاعدة الأصغر -1" />
                    <label
                      htmlFor="بعد القاعدة الأصغر -1"
                      className="check-box"
                    />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" checked={
                      !Object.prototype.hasOwnProperty.call(conditionStutes, "بعد القاعدة الأصغر")}
                      readOnly id="بعد القاعدة الأصغر 0" />
                    <label htmlFor="بعد القاعدة الأصغر 0" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="/3d-conditions_images/house.png" alt />
              <div classname="main-header">
                <p className="header-body">المسافة بين سطح التربة والقاعدة</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: "50%" }}>
                  <p className="content-body">
                    يجب أن تكون المسافة الدنيا من سطح التربة إلى  قاع القاعدة لا تقل 1.0 م.
                  </p>
                </div>
                <img src="/Str/slide1image5.png" alt />
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
                    <input type="checkbox" checked={
                      conditionStutes["المسافة بين سطح التربة والقاعدة"] === true}
                      readOnly id="المسافة بين سطح التربة والقاعدة 1" />
                    <label htmlFor="المسافة بين سطح التربة والقاعدة 1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" checked={
                      conditionStutes["المسافة بين سطح التربة والقاعدة"] === false}
                      readOnly id="المسافة بين سطح التربة والقاعدة -1" />
                    <label htmlFor="المسافة بين سطح التربة والقاعدة -1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" checked={
                      !Object.prototype.hasOwnProperty.call(conditionStutes, "المسافة بين سطح التربة والقاعدة")}
                      readOnly id="المسافة بين سطح التربة والقاعدة 0" />
                    <label htmlFor="المسافة بين سطح التربة والقاعدة 0" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="/3d-conditions_images/house.png" alt />
              <div classname="main-header">
                <p className="header-body">أبعاد الكمرة</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: "54%" }}>
                  <p className="content-body">
                    يجب ألا تقل نسبة العرض الى الارتفاع للكمرة عن 0.3 ويجب ألا يقل العرض عن 0.2 م ولا يتجاوز عرض العمود الداعم مضافاً اليه (0.75 h) على كل جانب من العمود الداعم.
                  </p>
                </div>
                <img
                  src="/Str/slide1image6.png"
                  alt
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
                    <input type="checkbox" checked={
                      conditionStutes["أبعاد الكمرة"] === true}
                      readOnly id="أبعاد الكمرة 1" />
                    <label htmlFor="أبعاد الكمرة 1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" checked={
                      conditionStutes["أبعاد الكمرة"] === false}
                      readOnly id="أبعاد الكمرة -1" />
                    <label htmlFor="أبعاد الكمرة -1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" checked={
                      !Object.prototype.hasOwnProperty.call(conditionStutes, "أبعاد الكمرة")}
                      readOnly id="أبعاد الكمرة 0" />
                    <label htmlFor="أبعاد الكمرة 0" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="/3d-conditions_images/house.png" alt />
              <div classname="main-header">
                <p className="header-body">عمق القاعدة فوق التسليح السفلي</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: "50%" }}>
                  <p className="content-body">
                    يجب ألا يقل عمق القاعدة فوق التسليح السفلي عن 0.3 م.

                  </p>
                </div>
                <img src="/Str/slide1image7.png" alt />
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
                    <input type="checkbox" checked={
                      conditionStutes["عمق القاعدة فوق التسليح السفلي"] === true}
                      readOnly id="عمق القاعدة فوق التسليح السفلي 1" />
                    <label htmlFor="عمق القاعدة فوق التسليح السفلي 1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" checked={
                      conditionStutes["عمق القاعدة فوق التسليح السفلي"] === false}
                      readOnly id="عمق القاعدة فوق التسليح السفلي -1" />
                    <label htmlFor="عمق القاعدة فوق التسليح السفلي -1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" checked={
                      !Object.prototype.hasOwnProperty.call(conditionStutes, "عمق القاعدة فوق التسليح السفلي")}
                      readOnly id="عمق القاعدة فوق التسليح السفلي 0" />
                    <label htmlFor="عمق القاعدة فوق التسليح السفلي 0" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="/3d-conditions_images/house.png" alt />
              <div classname="main-header">
                <p className="header-body">الخزانات</p>
              </div>
            </div>
            <div className="box">
              <div className="content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ minWidth: "65%", fontSize: "10px" }}>
                  <p className="content-body">
                    يحب أن يكون للخزانات شكل مستطيل وألا يزيد الطول عن 6 وألا يزيد الارتفاع 3.5 وأن تكون النسبة بين الطول إلى العرض بين 1 و1.5

                  </p>
                </div>
                <img src="/Str/slide1image8.png" alt />
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
                    <input type="checkbox" checked={
                      conditionStutes["الخزانات"] === true}
                      readOnly id="الخزانات 1" />
                    <label htmlFor="الخزانات 1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" checked={
                      conditionStutes["الخزانات"] === false}
                      readOnly id="الخزانات -1" />
                    <label htmlFor="الخزانات -1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        !Object.prototype.hasOwnProperty.call(conditionStutes, "الخزانات")}

                      id="الخزانات 0" />
                    <label htmlFor="الخزانات 0" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="page-section">
        <img src="/header.png" style={{ width: '100%' }} alt="" />

        <div className="section-header">
          <img src="/3d-conditions_images/image.png" alt />
          <h1 className="section-title">المتطلبات الإنشائية</h1>
        </div>
        <div className="conditions-grid">
          <div className="cond">
            <div className="header">
              <img src="/3d-conditions_images/house.png" alt />
              <div className="main-header">
                <p className="header-title">البلاطات الهوردي أحادية الاتجاه   </p>
                <p className="header-body">عرض العصب</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: '40%' }}>
                  <p className="content-body">
                    يجب ألا يقل عرض العصب في البلاطت الهوردي أحادية الاتجاه عن 0.10م.

                  </p>
                </div>
                <img src="/Str/slide2image1.png" alt />
              </div>
            </div>
            <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem' }}>
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" checked={
                      conditionStutes["عرض العصب"] === true}
                      readOnly id="cbtest-1" />
                    <label htmlFor="cbtest-1" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox" checked={
                      conditionStutes["عرض العصب"] === false}
                      readOnly id="cbtest-2" />
                    <label htmlFor="cbtest-2" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        !Object.prototype.hasOwnProperty.call(conditionStutes, "عرض العصب")}
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
              <img src="/3d-conditions_images/house.png" alt />
              <div className="main-header">
                <p className="header-title"> البلاطات الهوردي أحادية الاتجاه   </p>
                <p className="header-body">ارتفاع الكلي للعصب</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: '45%' }}>
                  <p className="content-body">
                    يجب ألا يزيد ارتفاع الكلي للعصب في البلاطات الهوردي أحادية الاتجاه عن 3.5*عرض العصب.

                  </p>
                </div>
                <img src="/Str/slide2image2.png" alt />
              </div>
            </div>
            <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem' }}>
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["ارتفاع الكلي للعصب"] === true}
                      id="cbtest-4" defaultChecked />
                    <label htmlFor="cbtest-4" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["ارتفاع الكلي للعصب"] === false}
                      id="cbtest-5" />
                    <label htmlFor="cbtest-5" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        !Object.prototype.hasOwnProperty.call(conditionStutes, "ارتفاع الكلي للعصب")}
                      id="cbtest-6" />
                    <label htmlFor="cbtest-6" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="/3d-conditions_images/house.png" alt />
              <div className="main-header">
                <p className="header-title"> البلاطات الهوردي أحادية الاتجاه   </p>
                <p className="header-body"> المسافة الصافية بين الأعصاب   </p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: '50%' }}>
                  <p className="content-body">
                    يجب ألا تزيد المسافة الصافية بين الأعصاب في البلاطات الهوردي أحادية الاتجاه عن 0.75 م

                  </p>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem' }}>
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["ملحق علوي"] === true}
                      id="cbtest-16" />
                    <label htmlFor="cbtest-16" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["ملحق علوي"] === false}
                      id="cbtest-17" />
                    <label htmlFor="cbtest-17" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        !Object.prototype.hasOwnProperty.call(conditionStutes, "ملحق علوي")}
                      id="cbtest-18" />
                    <label htmlFor="cbtest-18" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="/3d-conditions_images/house.png" alt />
              <div className="main-header">
                <p className="header-title"> البلاطات الهوردي أحادية الاتجاه   </p>
                <p className="header-body">سمك البلاطة فوق الاعصاب</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: '50%' }}>
                  <p className="content-body">
                    يجب ألا يقل سمك البلاطة فوق الأعصاب في البلاطات الهوردي أحادية الاتجاه عن الاكبر من 0.05 م والمسافة الصافية بين الأعصاب مقسوم على 12.
                  </p>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem' }}>
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["سمك البلاطة فوق الاعصاب"] === true}
                      id="cbtest-19" />
                    <label htmlFor="cbtest-19" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["سمك البلاطة فوق الاعصاب"] === false}
                      id="cbtest-20" />
                    <label htmlFor="cbtest-20" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        !Object.prototype.hasOwnProperty.call(conditionStutes, "سمك البلاطة فوق الاعصاب")}
                      id="cbtest-21" />
                    <label htmlFor="cbtest-21" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="/3d-conditions_images/house.png" alt />
              <div className="main-header">
                <p className="header-title"> البلاطات الهوردي ثنائية الاتجاه   </p>
                <p className="header-body">عرض العصب</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: '50%' }}>
                  <p className="content-body">
                    يجب ألا يقل عرض العصب في البلاطت الهوردي ثنائية الاتجاه عن 0.12 م.
                  </p>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem' }}>
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["عرض العصب"] === true}
                      id="cbtest-22" />
                    <label htmlFor="cbtest-22" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["عرض العصب"] === false}
                      id="cbtest-23" />
                    <label htmlFor="cbtest-23" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        !Object.prototype.hasOwnProperty.call(conditionStutes, "عرض العصب")}
                      id="cbtest-24" />
                    <label htmlFor="cbtest-24" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="/3d-conditions_images/house.png" alt />
              <div className="main-header">
                <p className="header-title">البلاطات الهوردي ثنائية الاتجاه   </p>
                <p className="header-body">ارتفاع الكلي للعصب</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: '50%' }}>
                  <p className="content-body">
                    يجب ألا يزيد ارتفاع الكلي للعصب في البلاطات الهوردي ثنائية الاتجاه عن 3.5 عرض العصب.

                  </p>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem' }}>
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["ارتفاع الكلي للعصب"] === true}
                      id="cbtest-25" />
                    <label htmlFor="cbtest-25" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["ارتفاع الكلي للعصب"] === false}
                      id="cbtest-26" />
                    <label htmlFor="cbtest-26" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        !Object.prototype.hasOwnProperty.call(conditionStutes, "ارتفاع الكلي للعصب")}
                      id="cbtest-27" />
                    <label htmlFor="cbtest-27" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="/3d-conditions_images/house.png" alt />
              <div className="main-header">
                <p className="header-title">البلاطات الهوردي ثنائية الاتجاه   </p>
                <p className="header-body">المسافة الصافية بين الأعصاب </p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: '50%' }}>
                  <p className="content-body">
                    يجب ألا تزيد المسافة الصافية بين الأعصاب في البلاطات الهوردي ثنائية الاتجاه عن 0.75 م.

                  </p>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem' }}>
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["المسافة الصافية بين الأعصاب "] === true}
                      id="cbtest-28" />
                    <label htmlFor="cbtest-28" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["المسافة الصافية بين الأعصاب "] === false}
                      id="cbtest-29" />
                    <label htmlFor="cbtest-29" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"

                      checked={
                        !Object.prototype.hasOwnProperty.call(conditionStutes, "المسافة الصافية بين الأعصاب ")}
                      id="cbtest-30" />
                    <label htmlFor="cbtest-30" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="/3d-conditions_images/house.png" alt />
              <div className="main-header">
                <p className="header-title">البلاطات الهوردي ثنائية الاتجاه   </p>
                <p className="header-body">سمك البلاطة فوق الأعصاب </p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: '50%' }}>
                  <p className="content-body">
                    يجب ألا يقل سمك البلاطة فوق الأعصاب في البلاطات الهوردي ثنائية الاتجاه عن الأكبر من 0.05م والمسافة الصافية بين الأعصاب مقسوم على 12.
                  </p>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem' }}>
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["سمك البلاطة فوق الأعصاب "] === true}
                      id="cbtest-31" />
                    <label htmlFor="cbtest-31" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["سمك البلاطة فوق الأعصاب "] === false}
                      id="cbtest-32" />
                    <label htmlFor="cbtest-32" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        !Object.prototype.hasOwnProperty.call(conditionStutes, "سمك البلاطة فوق الأعصاب ")}
                      id="cbtest-33" />
                    <label htmlFor="cbtest-33" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="/3d-conditions_images/house.png" alt />
              <div className="main-header">
                <p className="header-body">جدران الخزانات</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: '50%' }}>
                  <p className="content-body">
                    يجب أن يكون لجدران الخزانات سماكة لا تقل عن 0.2 م وفي حالة البحور الصافية التي تزيد عن 3.5م يجب ألا تقل السماكة عن 0.3 م.

                  </p>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem' }}>
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["جدران الخزانات"] === true}
                      id="cbtest-25" />
                    <label htmlFor="cbtest-25" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["جدران الخزانات"] === false}
                      id="cbtest-26" />
                    <label htmlFor="cbtest-26" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        !Object.prototype.hasOwnProperty.call(conditionStutes, "جدران الخزانات")}
                      id="cbtest-27" />
                    <label htmlFor="cbtest-27" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="/3d-conditions_images/house.png" alt />
              <div className="main-header">
                <p className="header-body">أرضيات الخزانات </p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: '50%' }}>
                  <p className="content-body">
                    يجب ان أن يكون لأرضيات الخزانات سماكة لا تقل عن 0.2 م وفي حالة البحور الصافية التي تزيد عن 3.5م يجب ألا تقل السماكة عن0.3 م

                  </p>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem' }}>
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["أرضيات الخزانات "] === true}
                      id="cbtest-28" />
                    <label htmlFor="cbtest-28" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["أرضيات الخزانات "] === false}
                      id="cbtest-29" />
                    <label htmlFor="cbtest-29" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"

                      checked={
                        !Object.prototype.hasOwnProperty.call(conditionStutes, "أرضيات الخزانات ")}
                      id="cbtest-30" />
                    <label htmlFor="cbtest-30" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="/3d-conditions_images/house.png" alt />
              <div className="main-header">
                <p className="header-body">جدارن القبو</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: '50%' }}>
                  <p className="content-body">
                    يجب أن يكون لجدران القبو سماكة لا تقل. عن 0.2 م وفي حالة البحور الصافية التي تزيد عن 3.5 م يجب ألا تقل السماكة عن 0.3 م.
                  </p>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem' }}>
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["جدارن القبو"] === true}
                      id="cbtest-31" />
                    <label htmlFor="cbtest-31" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["جدارن القبو"] === false}
                      id="cbtest-32" />
                    <label htmlFor="cbtest-32" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        !Object.prototype.hasOwnProperty.call(conditionStutes, "جدارن القبو")}
                      id="cbtest-33" />
                    <label htmlFor="cbtest-33" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="page-section">
        <img src="/header.png" style={{ width: '100%' }} alt="" />

        <div className="section-header">
          <img src="/3d-conditions_images/image.png" alt />
          <h1 className="section-title">المتطلبات الإنشائية</h1>
        </div>
        <div className="conditions-grid">
          <div className="cond">
            <div className="header">
              <img src="/3d-conditions_images/house.png" alt />
              <div className="main-header">
                <p className="header-body" style={{ fontSize: '18px' }}>للكمرات أو العوارض الخرسانية المسلحة التى لاترتكز أو ترفق بقواطيع أوتشييدات أخر </p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ minWidth: '50%' }}>
                  <p className="content-body">
                    بالنسبة للكمرات أو العوارض الخرسانية المسلحة التى لاترتكز أو ترفق بقواطيع أوتشييدات أخرى من المحتمل تضررها بالإنحرافات الكبيرة فإنه يجب ألا يقل عمق الكمرة عن القيم المحددة فى ‎table 5C-1 or section 5C4.1.2‏

                  </p>
                </div>
                <img src="/Str/slide3image1.png" alt />
              </div>
            </div>
            <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem' }}>
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["للكمرات أو العوارض الخرسانية المسلحة التى لاترتكز أو ترفق بقواطيع أوتشييدات أخر "] === true}
                      id="cbtest-7" />
                    <label htmlFor="cbtest-7" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["للكمرات أو العوارض الخرسانية المسلحة التى لاترتكز أو ترفق بقواطيع أوتشييدات أخر "] === false}
                      id="cbtest-8" />
                    <label htmlFor="cbtest-8" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        !Object.prototype.hasOwnProperty.call(conditionStutes, "للكمرات أو العوارض الخرسانية المسلحة التى لاترتكز أو ترفق بقواطيع أوتشييدات أخر ")}
                      id="cbtest-9" />
                    <label htmlFor="cbtest-9" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="/3d-conditions_images/house.png" alt />
              <div className="main-header">
                <p className="header-body" style={{ fontSize: '18px' }}>السماكة الكلية للبلاطة  <br />الخرسانية المصمتة المرتكزة على كمرات</p>
              </div>
            </div>
            <div className="box">
              <div className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                <div style={{ minWidth: '50%' }}>
                  <p className="content-body">
                    يجب ألا تقل السماكة الكلية للبلاطة الخرسانية المصمتة المرتكزة على كمرات فى جميع الجهات عن المعادلة رقم ‎ .5B-1‏

                  </p>
                </div>
                <img src="/Str/slide3image2.png" style={{ margin: '2.5rem' }} />
              </div>
            </div>
            <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem' }}>
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["السماكة الكلية للبلاطة الخرسانية المصمتة المرتكزة على كمرات"] === true}
                      id="cbtest-10" />
                    <label htmlFor="cbtest-10" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["السماكة الكلية للبلاطة الخرسانية المصمتة المرتكزة على كمرات"] === false}
                      id="cbtest-11" />
                    <label htmlFor="cbtest-11" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        !Object.prototype.hasOwnProperty.call(conditionStutes, ">السماكة الكلية للبلاطة الخرسانية المصمتة المرتكزة على كمرا")}
                      id="cbtest-12" />
                    <label htmlFor="cbtest-12" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="/3d-conditions_images/house.png" alt />
              <div className="main-header">
                <p className="header-body" style={{ fontSize: '1.rem' }}>السماكة الكلية للبلاطة الخرسانية المصمتة أحادية الإتجاه</p>
              </div>
            </div>
            <div className="box">
              <div className="content">
                <div style={{ maxWidth: '50%' }}>
                  <p className="content-body" style={{ fontSize: '11px' }} >
                    يجب ألا تقل السماكة الكلية للبلاطة الخرسانية المصمتة أحادية الإتجاه والتى لا تحمل أو تتصل بقواطيع أو غيرها من المنشآت المحتمل تضررها بقيم الترخيم الكبيرة عن القيم الواردة فى ,  table 5-2,table 5-1 -504.2  في حالة وجود عناصر تتأثر بالترخيم
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>

                  <img src="/Str/slide3image3 part1.png" style={{ height: '4rem' }} />
                  <img src="/Str/slide3image3 part2.png" />
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem' }}>
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["السماكة الكلية للبلاطة الخرسانية المصمتة أحادية الإتجاه"] === true}
                      id="cbtest-13" />
                    <label htmlFor="cbtest-13" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes["السماكة الكلية للبلاطة الخرسانية المصمتة أحادية الإتجاه"] === false}
                      id="cbtest-14" />
                    <label htmlFor="cbtest-14" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        !Object.prototype.hasOwnProperty.call(conditionStutes, "السماكة الكلية للبلاطة الخرسانية المصمتة أحادية الإتجاه")}
                      id="cbtest-15" />
                    <label htmlFor="cbtest-15" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cond">
            <div className="header">
              <img src="/3d-conditions_images/house.png" alt />
              <div className="main-header">
                <p className="header-body" style={{ fontSize: '18px' }}>السماكة الكلية للبلاطة  <br />الخرسانية المصمتة المرتكزة على كمرات</p>
              </div>
            </div>
            <div className="box">
              <div className="content"  >
                <div style={{ minWidth: '50%' }}>
                  <p className="content-body">
                    بالنسبة للعوارض والكمرات الخرسانية المسلحة الداعمة لعناصر غير إنشائية مبنية من مواد محتمل تضررها بالإنحرافات الكبيرة فإنه يجب ألا يقل عمق الكمرة عن القيم المحددة فى ‎table 5C-2 or section 5C4.1.2‏

                  </p>
                </div>
                <img src="/Str/slide3image4.png" />
              </div>
            </div>
            <div style={{ backgroundColor: '#ddefec !important', justifyItems: 'center', borderRadius: '0 0 25px 25px !important', maxHeight: '2.8rem' }}>
              <div className="footer">
                <div className="check">
                  <p>تحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes['السماكة الكلية للبلاطة الخرسانية المصمتة المرتكزة على كمرات '] === true}
                      id="cbtest-10" />
                    <label htmlFor="cbtest-10" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لم يتحقق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        conditionStutes['السماكة الكلية للبلاطة الخرسانية المصمتة المرتكزة على كمرات '] === false}
                      id="cbtest-11" />
                    <label htmlFor="cbtest-11" className="check-box" />
                  </div>
                </div>
                <div className="check">
                  <p>لا ينطبق</p>
                  <div className="checkbox-wrapper-19">
                    <input type="checkbox"
                      checked={
                        !Object.prototype.hasOwnProperty.call(conditionStutes, 'السماكة الكلية للبلاطة الخرسانية المصمتة المرتكزة على كمرات ')}
                      id="cbtest-12" />
                    <label htmlFor="cbtest-12" className="check-box" />
                  </div>
                </div>
              </div>
            </div>
          </div>



        </div>

      </div>

    </StyleWrapper>
  );
});

export default StrReport;
