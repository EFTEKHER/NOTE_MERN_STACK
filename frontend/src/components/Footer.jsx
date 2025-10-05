import React from 'react'
import { Mail, Phone, Github, Linkedin, ExternalLink, Code } from 'lucide-react'

const Footer = () => {
const links = {
  email: "eftekherali2000@gmail.com",
  phone: "+880-1829329907",
  linkedin: "https://www.linkedin.com/in/eftekher-ali-efte-589a82299/",
  github: "https://github.com/EFTEKHER",
  portfolio: "https://eftekheraliefteweb.vercel.app/",
  codeforces: "https://codeforces.com/profile/dont_love_anyone",
};


  return (
    // footer section position should fixed at below the page

    <footer className="bg-base-300 text-base-content py-8 fixed bottom-0 left-0 right-0">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
          
          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4" />
              <a 
                href={`mailto:${links.email}`}
                className="hover:text-primary transition-colors"
              >
                {links.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4" />
              <a 
                href={`tel:${links.phone}`}
                className="hover:text-primary transition-colors"
              >
                {links.phone}
              </a>
            </div>
          </div>

          {/* Professional Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold mb-4">Professional</h3>
            <div className="flex items-center gap-3">
              <Linkedin className="w-4 h-4" />
              <a 
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                LinkedIn <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Github className="w-4 h-4" />
              <a 
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                GitHub <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Portfolio & Coding */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold mb-4">Portfolio & Coding</h3>
            <div className="flex items-center gap-3">
              <ExternalLink className="w-4 h-4" />
              <a 
                href={links.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                Portfolio <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Code className="w-4 h-4" />
              <a 
                href={links.codeforces}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                Codeforces <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="#skills" className="block hover:text-primary transition-colors">Skills</a>
              <a href="#projects" className="block hover:text-primary transition-colors">Projects</a>
              <a href="#experience" className="block hover:text-primary transition-colors">Experience</a>
              <a href="#education" className="block hover:text-primary transition-colors">Education</a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-base-400 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-sm text-base-content/70">
              © {new Date().getFullYear()} Eftekher Ali Efte. All rights reserved.
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Available for new opportunities</span>
            </div>

            {/* Declaration */}
            <div className="text-xs text-base-content/60 text-center md:text-right">
              <p>All information provided is true to the best of my knowledge</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer