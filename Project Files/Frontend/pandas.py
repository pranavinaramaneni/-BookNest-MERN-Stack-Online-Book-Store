import pandas as pd
import numpy as np

# ------------------ 1–5: Importing & Creating ------------------
data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'David', 'Eva'],
    'Age': [25, 30, 35, np.nan, 40],
    'Salary': [50000, 60000, 55000, 65000, np.nan],
    'Department': ['HR', 'IT', 'IT', 'Finance', 'HR'],
    'Join_Date': ['2020-01-01', '2019-07-15', '2021-06-10', '2018-09-23', '2022-02-10']
}
df = pd.DataFrame(data)
df.to_csv('employees.csv', index=False)
df_excel = pd.read_csv('employees.csv')  # 2 - read_csv
df_excel.to_csv('exported.csv', index=False)  # 3 - to_csv

# ------------------ 6–10: Exploring ------------------
print(df.head())         # 6
print(df.tail())         # 7
print(df.shape)          # 8
print(df.info())         # 9
print(df.describe())     # 10

# ------------------ 11–15: Selecting & Filtering ------------------
print(df['Name'])        # 11
print(df[['Name', 'Age']])  # 12
print(df.loc[0])         # 13
print(df.iloc[1])        # 14
print(df[df['Age'] > 30])  # 15

# ------------------ 16–18: Sorting ------------------
print(df.sort_values('Age'))                 # 16
print(df.sort_values('Salary', ascending=False))  # 17
print(df.sort_index())                       # 18

# ------------------ 19–21: Missing Data ------------------
print(df.isnull())       # 19
print(df.dropna())       # 20
print(df.fillna(0))      # 21

# ------------------ 22–25: Aggregations ------------------
print(df['Age'].mean())           # 22
print(df['Salary'].sum())         # 23
print(df['Department'].value_counts())  # 24
print(df.groupby('Department').mean(numeric_only=True))  # 25

# ------------------ 26–30: Modifying ------------------
df['Bonus'] = df['Salary'] * 0.10         # 26
df = df.rename(columns={'Salary': 'Income'})  # 27
df = df.drop('Bonus', axis=1)            # 28
df = df.drop(4, axis=0)                  # 29
df['Department'] = df['Department'].replace({'IT': 'Tech'})  # 30

# ------------------ 31–34: String Operations ------------------
print(df['Name'].str.lower())            # 31
print(df['Department'].str.contains('Tech'))  # 32
print(df['Name'].str.strip())            # 33
df['Split_Name'] = df['Name'].str.split('a')  # 34

# ------------------ 35–38: Date/Time ------------------
df['Join_Date'] = pd.to_datetime(df['Join_Date'])  # 35
print(df['Join_Date'].dt.year)           # 36
print(df['Join_Date'].dt.month)          # 37
print(df['Join_Date'].dt.day)            # 38

# ------------------ 39–41: Merge, Join, Concat ------------------
df1 = df[['Name', 'Age']]
df2 = df[['Name', 'Income']]
merged = pd.merge(df1, df2, on='Name')     # 40
joined = df1.join(df2.set_index('Name'), on='Name', lsuffix='_left')  # 41
concated = pd.concat([df1, df2], axis=0)   # 39

# ------------------ 42–45: Reshape ------------------
pivoted = df.pivot(index='Name', columns='Department', values='Income')  # 42
melted = df.melt(id_vars=['Name'], value_vars=['Age', 'Income'])  # 43
stacked = df[['Name', 'Age']].stack()     # 44
unstacked = stacked.unstack()             # 45

# ------------------ 46–49: Indexing ------------------
df = df.set_index('Name')     # 46
df = df.reset_index()         # 47
print(df.index)               # 48
print(df.columns)             # 49

# ------------------ 50: Export to Excel ------------------
df.to_excel('final_output.xlsx', index=False)  # 50
