export function usePdfExport() {
  const exportToPdf = async (elementId, fileName) => {
    try {
      const element = document.getElementById(elementId)
      if (!element) {
        console.error(`Element with id "${elementId}" not found`)
        return
      }

      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ])

      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff',
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const imgHeight = (canvas.height * pageWidth) / canvas.width
      const totalPages = Math.max(1, Math.ceil(imgHeight / pageHeight))
      let remainingHeight = imgHeight
      let position = 0

      for (let page = 0; page < totalPages; page += 1) {
        if (page > 0) {
          pdf.addPage()
        }

        pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight)
        remainingHeight -= pageHeight
        position = remainingHeight - imgHeight
      }

      pdf.save(`${fileName}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      window.alert('Lỗi khi xuất PDF. Vui lòng thử lại.')
    }
  }

  return { exportToPdf }
}
