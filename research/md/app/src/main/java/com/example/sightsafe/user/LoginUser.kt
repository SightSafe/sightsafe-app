package com.example.sightsafe.user

import android.animation.AnimatorSet
import android.animation.ObjectAnimator
import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import com.example.sightsafe.ui.MainActivity
import com.example.sightsafe.R
import com.example.sightsafe.databinding.ActivityLoginUserBinding
import com.example.sightsafe.user.EmailValidator.addEmailValidation
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.GoogleAuthProvider

class LoginUser : AppCompatActivity() {
    private lateinit var binding: ActivityLoginUserBinding
    private lateinit var firebaseAuth: FirebaseAuth
    private lateinit var vmsignin: SignInViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginUserBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Add email validation
        binding.editTextEmail.addEmailValidation()

        // Initialize Firebase Auth
        firebaseAuth = FirebaseAuth.getInstance()

        // Initialize ViewModel
        vmsignin = ViewModelProvider(this)[SignInViewModel::class.java]

        binding.Login.setOnClickListener {
            val email = binding.editTextEmail.text.toString()
            val password = binding.editTextPassword.text.toString()

            if (email.isNotEmpty() && password.isNotEmpty()) {
                binding.progressBarLogin.visibility = View.VISIBLE
                firebaseAuth.signInWithEmailAndPassword(email, password).addOnCompleteListener {
                    binding.progressBarLogin.visibility = View.GONE
                    if (it.isSuccessful) {
                        val user = firebaseAuth.currentUser
                        if (user != null && user.isEmailVerified) {
                            vmsignin.message.value = "200"
                        } else {
                            showAlertDialog("Login Failed", "Please verify your email before logging in.")
                            firebaseAuth.signOut() // Sign out user if email is not verified
                        }
                    } else {
                        showAlertDialog("Login Failed", "Incorrect email or password.")
                    }
                }
            } else {
                showAlertDialog("Empty Fields", "Email and password fields cannot be empty.")
            }
        }

        vmsignin.message.observe(this) { message ->
            if (message == "200") {
                val builder = AlertDialog.Builder(this)
                builder.setTitle(R.string.info)
                builder.setMessage(R.string.validate_login_success)
                builder.setIcon(R.drawable.ic_baseline_check_green_24)
                val alertDialog: AlertDialog = builder.create()
                alertDialog.setCancelable(false)
                alertDialog.show()
                Handler(Looper.getMainLooper()).postDelayed({
                    alertDialog.dismiss()
                    val intent = Intent(this, MainActivity::class.java)
                    intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
                    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                    startActivity(intent)
                    finish()
                }, 2000)
            }
        }

        binding.googleBtn.setOnClickListener {
            binding.progressBarLogin.visibility = View.VISIBLE
            val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(getString(R.string.client_id))
                .requestEmail()
                .build()
            val googleSignInClient = GoogleSignIn.getClient(this, gso)
            googleSignInClient.signOut()
            startActivityForResult(googleSignInClient.signInIntent, 13)
        }

        playAnimation()
    }

    private fun playAnimation() {

        val titleAnim = ObjectAnimator.ofFloat(binding.titleTextView, View.TRANSLATION_X, -1000f, 0f).setDuration(150)
        val messageAnim = ObjectAnimator.ofFloat(binding.messageTextView, View.TRANSLATION_X, 1000f, 0f).setDuration(150)
        val emailTextViewAnim = ObjectAnimator.ofFloat(binding.emailTextView, View.TRANSLATION_X, -1000f, 0f).setDuration(150)
        val emailEditTextLayoutAnim = ObjectAnimator.ofFloat(binding.emailEditTextLayout, View.TRANSLATION_X, 1000f, 0f).setDuration(150)
        val passwordTextViewAnim = ObjectAnimator.ofFloat(binding.passwordTextView, View.TRANSLATION_X, -1000f, 0f).setDuration(150)
        val passwordEditTextLayoutAnim = ObjectAnimator.ofFloat(binding.passwordEditTextLayout, View.TRANSLATION_X, 1000f, 0f).setDuration(150)
        val loginAnim = ObjectAnimator.ofFloat(binding.Login, View.TRANSLATION_X, -1000f, 0f).setDuration(150)
        val orloginAnim = ObjectAnimator.ofFloat(binding.orlogin, View.TRANSLATION_X, 1000f, 0f).setDuration(150)
        val googleBtnAnim = ObjectAnimator.ofFloat(binding.googleBtn, View.TRANSLATION_X, -1000f, 0f).setDuration(150)

        val titleFadeIn = ObjectAnimator.ofFloat(binding.titleTextView, View.ALPHA, 0f, 1f).setDuration(150)
        val messageFadeIn = ObjectAnimator.ofFloat(binding.messageTextView, View.ALPHA, 0f, 1f).setDuration(150)
        val emailTextViewFadeIn = ObjectAnimator.ofFloat(binding.emailTextView, View.ALPHA, 0f, 1f).setDuration(150)
        val emailEditTextLayoutFadeIn = ObjectAnimator.ofFloat(binding.emailEditTextLayout, View.ALPHA, 0f, 1f).setDuration(150)
        val passwordTextViewFadeIn = ObjectAnimator.ofFloat(binding.passwordTextView, View.ALPHA, 0f, 1f).setDuration(150)
        val passwordEditTextLayoutFadeIn = ObjectAnimator.ofFloat(binding.passwordEditTextLayout, View.ALPHA, 0f, 1f).setDuration(150)
        val loginFadeIn = ObjectAnimator.ofFloat(binding.Login, View.ALPHA, 0f, 1f).setDuration(150)
        val orloginFadeIn = ObjectAnimator.ofFloat(binding.orlogin, View.ALPHA, 0f, 1f).setDuration(150)
        val googleBtnFadeIn = ObjectAnimator.ofFloat(binding.googleBtn, View.ALPHA, 0f, 1f).setDuration(150)

        AnimatorSet().apply {
            playSequentially(
                AnimatorSet().apply { playTogether(titleAnim, titleFadeIn) },
                AnimatorSet().apply { playTogether(messageAnim, messageFadeIn) },
                AnimatorSet().apply { playTogether(emailTextViewAnim, emailTextViewFadeIn) },
                AnimatorSet().apply { playTogether(emailEditTextLayoutAnim, emailEditTextLayoutFadeIn) },
                AnimatorSet().apply { playTogether(passwordTextViewAnim, passwordTextViewFadeIn) },
                AnimatorSet().apply { playTogether(passwordEditTextLayoutAnim, passwordEditTextLayoutFadeIn) },
                AnimatorSet().apply { playTogether(loginAnim, loginFadeIn) },
                AnimatorSet().apply { playTogether(orloginAnim, orloginFadeIn) },
                AnimatorSet().apply { playTogether(googleBtnAnim, googleBtnFadeIn) }
            )
            startDelay = 100
        }.start()
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == 13 && resultCode == RESULT_OK) {
            val task = GoogleSignIn.getSignedInAccountFromIntent(data)
            try {
                val account = task.getResult(ApiException::class.java)!!
                firebaseAuthWithGoogle(account.idToken!!)
            } catch (e: ApiException) {
                binding.progressBarLogin.visibility = View.GONE
                Toast.makeText(this, e.localizedMessage, Toast.LENGTH_LONG).show()
            }
        } else {
            binding.progressBarLogin.visibility = View.GONE
        }
    }

    private fun firebaseAuthWithGoogle(idToken: String) {
        val credential = GoogleAuthProvider.getCredential(idToken, null)
        firebaseAuth.signInWithCredential(credential)
            .addOnCompleteListener(this) { task ->
                binding.progressBarLogin.visibility = View.GONE
                if (task.isSuccessful) {
                    vmsignin.message.value = "200"
                } else {
                    Toast.makeText(this, "Google Sign-In failed.", Toast.LENGTH_LONG).show()
                }
            }.addOnFailureListener { exception ->
                binding.progressBarLogin.visibility = View.GONE
                Toast.makeText(this, exception.localizedMessage, Toast.LENGTH_LONG).show()
            }
    }

    private fun showAlertDialog(title: String, message: String) {
        val builder = AlertDialog.Builder(this)
        builder.setTitle(title)
        builder.setMessage(message)
        builder.setPositiveButton("OK") { dialog, _ -> dialog.dismiss() }
        val dialog = builder.create()
        dialog.show()
    }
}