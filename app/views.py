import pdb
from app import app,db
from app.models import Article,Usr
from flask import flash,url_for,render_template,request,make_response,redirect,session
@app.route('/')
def index():
    articles=Article.query.limit(3).all()
    usr=session['username'] if 'username' in session else None
    app.logger.info(str(usr))
    return render_template('index.html',articles=articles,usr=usr)
    # return render_template('index1.5.html')

@app.route('/register',methods=["get","post"])
def register():
    print('register')
    pdb.set_trace()
    if request.method=="POST":
        if valid_register(request.form):
            form=request.form
            app.logger.info(form)
            usr=Usr(form['name'],form['password'],form['phoneNumber'],form["sex"],form['email'],None)
            db.session.add(usr)
            db.session.commit()
            session['username'] = form['name']
            app.logger.info('success')
            flash('You were successfully registered')
            return redirect(url_for('index'))
    return render_template('register.html')

def valid_register(form):
    return True

@app.route('/login',methods=['get','post'])
def login():
    if request.method == 'POST':
        if valid_login(request.form):
            
        # if request.form['username'] != app.config['USERNAME']:
        #     error = 'Invalid username'
        # elif request.form['password'] != app.config['PASSWORD']:
        #     error = 'Invalid password'
        # else:
            session['username'] = request.form['username']
            flash('You were logged in')
            return 'yes'
        else:
            flash('username and password are not matched',"error")
            return ('fail','200',None)
    return render_template('login.html')

def valid_login(form):
    users=Usr.query.filter_by(name=form['username']).all()
    if users!=None and len(users)==1 and users[0].password==form['password']:
        return True
    return False


@app.route('/static/<path:path>')
def staticFun(path):
    # return url_for('static')
    if path==None or path=='':
        return 
    return send_from_directory('static', path)

@app.route('/logout')
def logout():
    session.pop('username',None)
    return redirect(url_for('index'))