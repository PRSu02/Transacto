from flask import render_template, request, redirect, url_for, flash
from app import app
import mysql.connector

def get_db_connection():
    conn = mysql.connector.connect(
        host=app.config['MYSQL_HOST'],
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD'],
        database=app.config['MYSQL_DB']
    )
    return conn

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/transaction')
def transaction():
    return render_template('transaction.html')

@app.route('/register', methods=['POST'])
def register():
    cardholder_name = request.form['cardholderName']
    card_no = request.form['cardNo']
    password = request.form['password']

    if cardholder_name and card_no and password:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('INSERT INTO cards (cardholder_name, card_no, password) VALUES (%s, %s, %s)', (cardholder_name, card_no, password))
        conn.commit()
        cursor.close()
        conn.close()
        flash('Registration Successful!', 'success')
        return redirect(url_for('index'))
    else:
        flash('Please fill in all details.', 'error')
        return redirect(url_for('index'))

@app.route('/verify_transaction', methods=['POST'])
def verify_transaction():
    card_no = request.form['cardNo']
    password = request.form['password']

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM cards WHERE card_no = %s AND password = %s', (card_no, password))
    result = cursor.fetchone()
    cursor.close()
    conn.close()

    if result:
        flash('Transaction Successful!', 'success')
        return redirect(url_for('transaction'))
    else:
        flash('Transaction Failed', 'error')
        return redirect(url_for('transaction'))
