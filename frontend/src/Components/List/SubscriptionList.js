import React from "react";
import "./list.css";

function SubscriptionList({ subscriptions, onDelete }) {
  return (
    <div className="subscription-list-container">
      <h3 className="subscription-title">قائمة الاشتراكات</h3>
      {subscriptions.length === 0 ? (
        <p className="no-subscriptions">لا توجد اشتراكات حالياً.</p>
      ) : (
        <div className="table-wrapper">
          <table className="subscription-table">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>السعر</th>
                <th>الفئة</th>
                <th>آخر استخدام</th>
                <th>إجراء</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub, index) => (
                <tr key={index}>
                  <td>{sub.name}</td>
                  <td>{sub.price} ﷼</td>
                  <td>{sub.category}</td>
                  <td>{sub.lastUsed}</td>
                  <td>
                    <button className="delete-btn" onClick={() => onDelete(index)}>
                      حذف 🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SubscriptionList;
