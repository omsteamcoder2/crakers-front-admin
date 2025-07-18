export const RequiredFieldIndicator = () => {
    return <span className="text-red-600 ml-1">*</span>
  }
  
  export const FormLegend = () => {
    return (
      <div className="text-sm text-gray-500 italic mb-4">
        <span className="text-red-600">*</span> indicates required fields
      </div>
    )
  }
  