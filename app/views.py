from app import app,db
from app.models import Article,Usr
from flask import url_for,render_template,request,make_response,redirect
@app.route('/')
def index():
    articles=Article.query.limit(3).all()
    return render_template('index.html',articles=articles)
    # return render_template('index1.5.html')

@app.route('/register',methods=["get","post"])
def register():
    if request.method=="post":
        if valid_register(request.form):
            form=request.form
            usr=Usr(form['name'],form['password'],form['phoneNunber'],form["sex"],None)
            db.session.add(usr)
            db.commit()
            resp=make_response(render_template("index.html"))
            session['loged_in']=True
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

@app.route('/static/<path:path>')
def staticFun(path):
    # return url_for('static')
    return send_from_directory('static', path)