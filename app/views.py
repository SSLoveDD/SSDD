from app import app,db
from app.models import Article,Usr
from flask import render_template,request,make_response,redirect
@app.route('/')
def index():
    articles=Article.query.limit(3).all()
    return render_template('index.html',articles=articles)

@app.route('/register',methods=["get","post"])
def register():
    if request.method=="post":
        if valid_register(request.form):
            form=request.form
            usr=Usr(form['name'],form['password'],form['phoneNunber'],form["sex"],None)
            db.session.add(usr)
            db.commit()
            resp=make_response(render_template("index.html"))
            resp.set_cookie('usrname',form['name'])
            resp.set_cookie('password',form['password'])
            return resp
    return render_template('register.html')

def valid_register(form):
    return True

@app.route('/login',methods=['get','post'])
def login():
    if request.method == 'POST':
        if request.form['username'] != app.config['USERNAME']:
            error = 'Invalid username'
        elif request.form['password'] != app.config['PASSWORD']:
            error = 'Invalid password'
        else:
            session['logged_in'] = True
            flash('You were logged in')
            return redirect(url_for('index'))
    return render_template('login.html')