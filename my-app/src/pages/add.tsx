const handleAddItem = () => {
    const currentItems = getAllItems();
    const maxId = currentItems.reduce((max, item) =>
      item.id > max ? item.id : max
    , 0);
    