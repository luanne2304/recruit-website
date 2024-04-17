import React, { useState } from 'react';

function Test() {
  const [items, setItems] = useState(['A', 'B', 'C', 'D']);

  const handleDeleteItem = (index) => {
    // Tạo một bản sao của mảng hiện tại
    const newItems = [...items];
    // Xóa phần tử tại chỉ số được truyền vào
    newItems.splice(index, 1);
    // Cập nhật state với mảng mới đã xóa phần tử
    setItems(newItems);
  };

  const handleAddItem = () => {
    // Tạo một bản sao của mảng hiện tại và thêm phần tử mới vào cuối mảng
    const newItems = [...items, 'New Item'];
    // Cập nhật state với mảng mới đã thêm phần tử
    setItems(newItems);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <button onClick={() => handleDeleteItem(index)}>Xóa</button>
          <span>{item}</span>
        </div>
      ))}
      <button onClick={handleAddItem}>Thêm phần tử</button>
    </div>
  );
}

export default Test;