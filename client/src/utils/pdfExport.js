import { jsPDF } from 'jspdf';

export const exportVerdictPDF = ({ judgement, userName = 'Defendant' }) => {
  if (!judgement) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  // Background Dark Theme
  doc.setFillColor(15, 15, 15);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Decorative Top Accent Bar
  doc.setFillColor(239, 68, 68); // #EF4444
  doc.rect(margin, margin, contentWidth, 2, 'F');

  // Header Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(245, 245, 245);
  doc.text('LIFE JUDGE AI', margin, margin + 12);

  doc.setFontSize(8);
  doc.setFont('courier', 'bold');
  doc.setTextColor(239, 68, 68);
  doc.text('OFFICIAL SUPREME COURT DECREE', margin, margin + 18);

  // Metadata Block
  const dateStr = new Date(judgement.createdAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text(`CASE REF: #${judgement._id.slice(-8).toUpperCase()}`, pageWidth - margin, margin + 10, { align: 'right' });
  doc.text(`DATE: ${dateStr}`, pageWidth - margin, margin + 15, { align: 'right' });
  doc.text(`DEFENDANT: ${userName.toUpperCase()}`, pageWidth - margin, margin + 20, { align: 'right' });

  // Divider
  doc.setDrawColor(40, 40, 40);
  doc.line(margin, margin + 24, pageWidth - margin, margin + 24);

  // Score Banner Card
  let y = margin + 30;
  doc.setFillColor(23, 23, 23);
  doc.setDrawColor(60, 30, 30);
  doc.roundedRect(margin, y, contentWidth, 28, 3, 3, 'FD');

  doc.setFont('courier', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(239, 68, 68);
  doc.text(`${judgement.overallScore}`, margin + 8, y + 17);

  doc.setFontSize(10);
  doc.setTextColor(160, 160, 160);
  doc.text('/ 100', margin + 35, y + 17);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text(`${judgement.performanceLabel.toUpperCase()}`, margin + 55, y + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(170, 170, 170);
  const splitSummary = doc.splitTextToSize(judgement.summary || 'Official daily evaluation completed.', contentWidth - 65);
  doc.text(splitSummary, margin + 55, y + 19);

  // 5 Pillars Breakdown
  y += 34;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(245, 245, 245);
  doc.text('5 PILLARS CROSS-EXAMINATION', margin, y);

  y += 4;
  const categories = Object.entries(judgement.categoryScores || {});
  const cardWidth = (contentWidth - (categories.length - 1) * 2) / categories.length;

  categories.forEach(([key, val], idx) => {
    const cardX = margin + idx * (cardWidth + 2);
    doc.setFillColor(23, 23, 23);
    doc.setDrawColor(40, 40, 40);
    doc.roundedRect(cardX, y, cardWidth, 18, 2, 2, 'FD');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.text(key.slice(0, 10).toUpperCase(), cardX + 3, y + 6);

    doc.setFont('courier', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(val.score >= 70 ? 34 : val.score >= 50 ? 249 : 239, val.score >= 70 ? 197 : val.score >= 50 ? 115 : 68, val.score >= 70 ? 94 : 22);
    doc.text(`${val.score}%`, cardX + 3, y + 13);
  });

  // Official Verdict
  y += 24;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(239, 68, 68);
  doc.text('OFFICIAL JUDICIAL VERDICT', margin, y);

  y += 4;
  doc.setFillColor(23, 23, 23);
  doc.setDrawColor(60, 40, 40);

  const verdictLines = doc.splitTextToSize(`"${judgement.verdict}"`, contentWidth - 10);
  const verdictHeight = Math.max(22, verdictLines.length * 5 + 8);
  doc.roundedRect(margin, y, contentWidth, verdictHeight, 2, 2, 'FD');

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9.5);
  doc.setTextColor(230, 230, 230);
  doc.text(verdictLines, margin + 5, y + 7);

  // Mistakes & Achievements side by side
  y += verdictHeight + 6;
  const colW = (contentWidth - 4) / 2;

  // Biggest Mistake
  doc.setFillColor(23, 18, 18);
  doc.setDrawColor(120, 30, 30);
  doc.roundedRect(margin, y, colW, 26, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(239, 68, 68);
  doc.text('PRIMARY SYSTEMIC ERROR', margin + 4, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(200, 200, 200);
  const mistakeLines = doc.splitTextToSize(judgement.biggestMistake || 'None noted', colW - 8);
  doc.text(mistakeLines, margin + 4, y + 12);

  // Best Achievement
  doc.setFillColor(18, 23, 18);
  doc.setDrawColor(30, 100, 50);
  doc.roundedRect(margin + colW + 4, y, colW, 26, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(34, 197, 94);
  doc.text('AUTHENTIC ACCOMPLISHMENT', margin + colW + 8, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(200, 200, 200);
  const achLines = doc.splitTextToSize(judgement.bestAchievement || 'None noted', colW - 8);
  doc.text(achLines, margin + colW + 8, y + 12);

  // 3-Point Correction Protocol
  y += 32;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(59, 130, 246);
  doc.text('3-POINT CORRECTION PROTOCOL', margin, y);

  y += 4;
  (judgement.improvements || []).slice(0, 3).forEach((imp, i) => {
    doc.setFillColor(23, 23, 23);
    doc.roundedRect(margin, y, contentWidth, 8, 1.5, 1.5, 'F');
    doc.setFont('courier', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(59, 130, 246);
    doc.text(`0${i + 1}`, margin + 3, y + 5.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(220, 220, 220);
    const impText = doc.splitTextToSize(imp, contentWidth - 20);
    doc.text(impText[0] || imp, margin + 12, y + 5.5);
    y += 10;
  });

  // Tomorrow Challenge
  y += 2;
  doc.setFillColor(28, 20, 15);
  doc.setDrawColor(249, 115, 22);
  doc.roundedRect(margin, y, contentWidth, 16, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(249, 115, 22);
  doc.text("TOMORROW'S MANDATORY CHALLENGE", margin + 4, y + 5.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(240, 240, 240);
  const chalText = doc.splitTextToSize(judgement.tomorrowChallenge || 'Complete your priority sprint before noon.', contentWidth - 8);
  doc.text(chalText, margin + 4, y + 11);

  // Footer seal & verification
  doc.setFont('courier', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text('VERIFIED DIGITAL COURT SEAL • CRYPTOGRAPHIC EVIDENCE HASH APPLIED • LIFE JUDGE AI', pageWidth / 2, pageHeight - 8, { align: 'center' });

  // Save the PDF
  const filename = `LifeJudge-Verdict-${judgement._id.slice(-6).toUpperCase()}.pdf`;
  doc.save(filename);
};
